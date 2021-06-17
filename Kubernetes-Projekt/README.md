## Zestaw poleceń do uruchomienia projektu
```
kubectl apply -f postgres-configMap.yaml
kubectl apply -f postgres-secret.yaml

kubectl apply -f pv-local.yaml
kubectl apply -f postgres-pvc.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-clusterip.yaml

kubectl apply -f redis-deployment.yaml
kubectl apply -f redis-clusterip.yaml

kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-clusterip.yaml

kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-clusterip.yaml

kubectl apply -f myingress.yaml
```

## Zestaw poleceń zatrzymujących komponenty w projekcie
```
kubectl delete ingress myingress

kubectl delete service nginx-clusterip
kubectl delete deploy nginx-deployment

kubectl delete service backend-clusterip
kubectl delete deploy backend-deployment

kubectl delete service redis-clusterip
kubectl delete deploy redis-deployment

kubectl delete service mypostgres-clusterip
kubectl delete deploy mypostgres-deployment
kubectl delete pvc postgres-pvc
kubectl delete pv pv-local

kubectl delete secret myapp-secret
kubectl delete cm mypostgres-config
```
