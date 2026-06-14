- choco install kubernetes-helm

- Install Kube Prometheus Stack

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://charts.helm.sh/stable
helm repo update
kubectl create namespace monitoring
helm install kind-prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --set prometheus.service.nodePort=30000 --set prometheus.service.type=NodePort --set grafana.service.nodePort=31001 --set grafana.service.type=NodePort --set alertmanager.service.nodePort=32002 --set alertmanager.service.type=NodePort --set prometheus-node-exporter.service.nodePort=32003 --set prometheus-node-exporter.service.type=NodePort
kubectl get svc -n monitoring
kubectl get namespace
```

```bash
- kubectl port-forward svc/kind-prometheus-kube-prome-prometheus -n monitoring 9090:9090 --address=0.0.0.0 &

# kubectl port-forward svc/kind-prometheus-grafana -n monitoring 3000:80 --address=0.0.0.0 &

- kubectl port-forward svc/kind-prometheus-grafana -n monitoring 3000:80 --address=0.0.0.0
# Get the password of grafana
- kubectl get secret -n monitoring kind-prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode

```
