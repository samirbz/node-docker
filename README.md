### To start docker container
_docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d_
### To rebuild image do when you add package
_docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build_
### To renew anon volume you have to do when add packages this is create new anon volume
_docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V_
### To stop docker container
_docker compose -f docker-compose.yml -f docker-compose.dev.yml down_
### To check logs - this is used to check the exact terminal like listening port , databasec onnect
_docker logs node-docker-node-app-1 -f_
### To go to mongo shell
_docker exec -it node-docker-mongo-1 mongosh -u "sameer" -p "mypassword"_
### Remove container with volumes also
_docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v_
