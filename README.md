To start docker container
- docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
To rebuild image
- docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
To stop docker container
- docker compose -f docker-compose.yml -f docker-compose.dev.yml down
To check logs - this is used to check the exact terminal like listening port , databasec onnect
- docker logs node-docker-node-app-1 -f
To go to mongo shell
- docker exec -it node-docker-mongo-1 mongosh -u "sameer" -p "mypassword"
Remove container with volumes also
- docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
