# Microservices Architecture with Dynatrace Observability

## Overview

This project demonstrates a production-grade microservices architecture deployed on AWS EC2 using Docker containers. The system consists of independently deployable backend services, a frontend application, event-driven communication using NATS messaging, and MongoDB for persistent data storage.

The architecture follows modern cloud-native principles such as service isolation, asynchronous communication, centralized observability, and scalable deployment practices.

![Microservices Architecture](./dynatrace.png)

## Deployment & Monitoring

After successful CI/CD pipeline execution, the application becomes accessible via:

Application Repository: https://github.com/Badhon58/FullStackMicroservice/tree/main

## Infrastructure Setup

### EC2 Instance Setup

- Launch AWS EC2 instance (t3.medium recommended)
- Configure Security Groups:
  - Port 80 (HTTP)
  - Port 5000 (API Gateway)
- Allocate storage: 30 GB
- [Install or Full Microservices Setup Of the template](./Microservices.md)

### Dynatrace Observability Validation

Once deployed, the following monitoring features are verified in Dynatrace:

- Distributed tracing across microservices
- Service discovery via Smartscape
- Infrastructure monitoring (CPU, memory, network)
- Centralized log aggregation
- Real User Monitoring (RUM)
- Synthetic monitoring checks
- Performance bottleneck detection
- Service dependency mapping
