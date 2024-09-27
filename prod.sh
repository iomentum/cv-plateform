docker load -i client.tar
docker load -i server.tar

rm -f client.tar
rm -f server.tar

docker-compose up