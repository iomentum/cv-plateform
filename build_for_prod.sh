mv ./Backend/.env ./Backend/.env-dev
cp .env ./Backend/.env

docker build --platform linux/amd64 --no-cache -t jobbi-client ./Frontend
docker build --platform linux/amd64 --no-cache -t jobbi-server ./Backend

mv ./Backend/.env-dev ./Backend/.env
