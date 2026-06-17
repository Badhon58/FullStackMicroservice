### Install Docker and Docker-compose in the ec2

- [Docker and Docker Compose Installation Shell Code](./docker.sh)

---

### Clone Repository

```bash
# Install git
sudo yum install git -y

# Cloning Repo
git clone -b monitoring https://github.com/Badhon58/FullStackMicroservice.git
cd FullStackMicroservice
```

---

### Backend Setup

**Start MongoDB**

```bash
cd ComposeFile/mongodb
docker-compose up -d
```

**Gateway Service Environment**

```bash
cd backend/gateway

cat >> .env << EOF
GATEWAY_PORT=5000
ENVIRONMENT=LIVE
NATS_URL_LIVE=nats://nats_network:4222
EOF
```

**Product Service Environment**

```bash
cd backend/product

cat >> .env << EOF
DATA_BASE_URL=mongodb://admin:badhon118@mongodb:27017/html?authSource=admin
ENVIRONMENT=LIVE
NATS_URL_LIVE=nats://nats_network:4222
EOF
```

**User Service Environment**

```bash
cd backend/user

cat >> .env << EOF
DATA_BASE_URL=mongodb://admin:badhon118@mongodb:27017/html?authSource=admin
ENVIRONMENT=LIVE
NATS_URL_LIVE=nats://nats_network:4222
EOF
```

**Start Backend Services**

```bash
cd backend
docker compose up -d
```

---

### Frontend Setup

**Frontend Setup**

```bash
cat >> .env << EOF
NEXT_PUBLIC_API_URL=http://<EC2_PUBLIC_IP>:5000
EOF
docker compose up -d
```

**NGINX Setup**

```bash
cd nginx-proxy
docker-compose up -d
# Configure NGINX reverse proxy to forward traffic to frontend running on port 3000.
```

### Install Dynatrace OneAgent

- Open Dynatrace Console
- Navigate to Deploy OneAgent
- Select Distributed Tracing
- Choose Host-based installation
- Enable Full-stack monitoring
- Generate installation token
- Run OneAgent installation script on EC2 as privileged user
- Verify host appears in Dynatrace
