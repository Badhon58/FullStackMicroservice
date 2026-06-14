# 📦 Kubernetes Microservices Project Architecture

## 🧭 Overview

This project is a _Kubernetes-based microservices system_ deployed on a local _Kind cluster_. It consists of multiple backend services (Gateway, User, Product), a frontend application, messaging layer (NATS), database (MongoDB), and full observability stack using _Prometheus + Grafana_.

The system is designed to simulate a production-like microservice architecture with service-to-service communication, centralized monitoring, and container orchestration.

## ![Kubernetes Microservices Project Architecture](./archetucture.png)

## 🏗️ High-Level Architecture

```bash
                          ┌────────────────────────────┐
                          │        Frontend (Next.js)  │
                          │ NodePort: 31000            │
                          └────────────┬───────────────┘
                                       │
                                       │ HTTP API
                                       ▼
                          ┌────────────────────────────┐
                          │       API Gateway          │
                          │ NodePort: 32000            │
                          └────────────┬───────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            │                          │                          │
            ▼                          ▼                          ▼
 ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
 │  User Service    │     │ Product Service  │     │   MongoDB        │
 │ (Microservice)   │     │ (Microservice)   │     │ Stateful DB      │
 └────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
          │                        │                        │
          └──────────────┬─────────┴──────────┬────────────┘
                         ▼                    ▼
                    ┌────────────────────────────┐
                    │          NATS              │
                    │ Messaging Broker (4222)    │
                    └────────────────────────────┘
```

## ☸️ Kubernetes Cluster Setup (Kind)

- 1 Control Plane Node + 2 Worker Nodes
- Port mappings exposed for external access:
  - Frontend → _31000_
  - Gateway → _32000_
  - Monitoring stack → 33000+
- _kind-cluster.yaml_

```bash
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    image: kindest/node:v1.34.3@sha256:08497ee19eace7b4b5348db5c6a1591d7752b164530a36f855cb0f2bdcbadd48
    extraPortMappings:
      - containerPort: 31000
        hostPort: 31000
      - containerPort: 32000
        hostPort: 32000
      - containerPort: 33000
        hostPort: 33000
  - role: worker
    image: kindest/node:v1.34.3@sha256:08497ee19eace7b4b5348db5c6a1591d7752b164530a36f855cb0f2bdcbadd48
  - role: worker
    image: kindest/node:v1.34.3@sha256:08497ee19eace7b4b5348db5c6a1591d7752b164530a36f855cb0f2bdcbadd48
```

---

## Core Components

1. **🎯 Frontend (Next.js)**
   - Runs in Kubernetes Deployment
   - Exposed via NodePort 31000
   - Communicates only with API Gateway
   - Uses environment variable:
   - NEXT_PUBLIC_API_URL=http://<node-ip>:32000

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
      role: frontend
  template:
    metadata:
      labels:
        app: frontend
        role: frontend
    spec:
      containers:
        - name: frontend-pod
          image: badhon58/frontend:v2
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: "300m"
              memory: "512Mi"
            limits:
              cpu: "500m"
              memory: "1Gi"
          env:
            - name: NEXT_PUBLIC_API_URL
              value: http://192.168.10.45:32000
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  selector:
    app: frontend
    role: frontend
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 31000
  type: NodePort

```

2. **🚪 API Gateway**
   - Entry point for all backend requests
   - Routes traffic to microservices
   - Connects to NATS for async communication
   - Exposed via NodePort 32000

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gateway
spec:
  selector:
    matchLabels:
      app: gateway
  template:
    metadata:
      labels:
        app: gateway
    spec:
      containers:
        - name: gateway
          image: badhon58/backend:gateway
          resources:
            requests:
              memory: "100Mi"
              cpu: "350m"
            limits:
              memory: "128Mi"
              cpu: "500m"
          ports:
            - containerPort: 5000
          env:
            - name: GATEWAY_PORT
              value: "5000"
            - name: ENVIRONMENT
              value: LIVE
            - name: NATS_URL_LIVE
              value: nats://nats:4222

---
apiVersion: v1
kind: Service
metadata:
  name: gateway
spec:
  type: NodePort
  selector:
    app: gateway
  ports:
    - port: 5000
      targetPort: 5000
      nodePort: 32000

```

3. **👤 User Service**
   - Handles authentication / user data
   - Connected to MongoDB
   - Uses NATS for event-based communication
   - Stateless microservice

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user
spec:
  selector:
    matchLabels:
      app: user
  template:
    metadata:
      labels:
        app: user
    spec:
      containers:
        - name: user
          image: badhon58/user:latest
          resources:
            requests:
              memory: "100Mi"
              cpu: "300m"
            limits:
              memory: "128Mi"
              cpu: "500m"
          env:
            - name: DATA_BASE_URL
              # value: mongodb://admin:password123@mongodb:27017/mydb?authSource=admin
              value: mongodb://mongodb:27017/mydb?authSource=admin
            - name: ENVIRONMENT
              value: LIVE
            - name: NATS_URL_LIVE
              value: nats://nats:4222

```

4. 📦 Product Service
   - Manages product-related operations
   - Stores data in MongoDB
   - Uses NATS for async messaging
   - Independent deployment

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product
spec:
  replicas: 1
  selector:
    matchLabels:
      app: product
  template:
    metadata:
      labels:
        app: product
    spec:
      containers:
        - name: product
          image: badhon58/product:latest
          resources:
            requests:
              memory: "120Mi"
              cpu: "300m"
            limits:
              memory: "128Mi"
              cpu: "500m"
          env:
            - name: DATA_BASE_URL
              # value: mongodb://admin:password123@mongodb:27017/mydb?authSource=admin
              value: mongodb://mongodb:27017/mydb?authSource=admin
            - name: ENVIRONMENT
              value: LIVE
            - name: NATS_URL_LIVE
              value: nats://nats:4222

```

5. 🗄️ MongoDB
   - Stateful database deployment
   - Uses Persistent Volume Claim (PVC)
   - Shared by User and Product services
   - Runs without auth in current setup (--noauth)

```bash
# pv
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mongodb-pv
spec:
  capacity:
    storage: 3Gi

  accessModes:
    - ReadWriteOnce

  persistentVolumeReclaimPolicy: Retain

  storageClassName: manual

  hostPath:
    path: /tmp/mongodb-data

---
# pvc

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pvc
spec:
  accessModes:
    - ReadWriteOnce

  resources:
    requests:
      storage: 2Gi

  storageClassName: manual

  volumeName: mongodb-pv
---
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo:7
          args: ["--noauth"]
          resources:
            requests:
              cpu: "300m"
              memory: "512Mi"
            limits:
              cpu: "500m"
              memory: "1Gi"
          ports:
            - containerPort: 27017
          # env:
          #   - name: MONGO_INITDB_ROOT_USERNAME
          #     value: admin
          #   - name: MONGO_INITDB_ROOT_PASSWORD
          #     value: password123
          volumeMounts:
            - name: mongo-storage
              mountPath: /data/db

      volumes:
        - name: mongo-storage
          persistentVolumeClaim:
            claimName: mongodb-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb
spec:
  selector:
    app: mongodb
  ports:
    - port: 27017
      targetPort: 27017

# mongodb://admin:password123@mongodb:27017/mydb?authSource=admin


```

6. 📡 NATS Messaging Broker
   - Lightweight event-driven messaging system
   - Enables async communication between services
   - Improves decoupling and scalability

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nats
spec:
  selector:
    matchLabels:
      app: nats
  template:
    metadata:
      labels:
        app: nats
    spec:
      containers:
        - name: nats
          image: nats
          ports:
            - containerPort: 4222
          resources:
            requests:
              cpu: "100m"
              memory: "100Mi"
            limits:
              cpu: "120m"
              memory: "150Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: nats
spec:
  selector:
    app: nats
  ports:
    - port: 4222
      targetPort: 4222

```

7. 📊 Monitoring Stack (Prometheus + Grafana)
   - Installed via Helm (kube-prometheus-stack)
   - Collects cluster + pod metrics
   - Grafana dashboards for visualization
   - NodePort access for UI dashboards

- [Grafana k8s](./k8s/Monitoring/Radar/grafana1.png)
- [Grafana k8s](./k8s/Monitoring/Radar/grafana2.png)
- [Radar K8s](./k8s/Monitoring/Radar/radar.png)
- [Radar K8s](./k8s/Monitoring/Radar/traffic.png)

- 🚀 Resume Highlights (IMPORTANT)

You can use these directly:

- Designed and deployed a Kubernetes-based microservices architecture using a multi-node Kind cluster.
- Implemented event-driven communication between microservices using NATS messaging broker.
- Built scalable backend services (User, Product, Gateway) with MongoDB integration and containerized deployments.
- Configured Ingress-like routing using NodePort services for frontend and backend exposure.
- Integrated Prometheus and Grafana monitoring stack for real-time cluster observability and performance tracking
