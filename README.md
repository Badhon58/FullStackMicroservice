docker run -p 3001:3000 -e ACKEE_MONGODB='mongodb://xxx:xxx@xxxx:27017/ackee?authSource=admin' -e ACKEE_USERNAME='admin' -e ACKEE_PASSWORD='badhon118' --link mongodb --name ackee electerious/ackee


docker run -d \
  --name myapp \
  -e MONGO_URL="mongodb+srv://xxxx:xxxx@cluster0.xxxxx.mongodb.net/mydb" \
  my-image
'
DATA_BASE_URL=mongodb://xxx:xxx@xxxx:27017/ackee?authSource=admin
ENVIRONMENT=LIVE
NATS_URL_LOCAL=nats://localhost:4222
NATS_URL_LIVE=nats://natGateway:4222

