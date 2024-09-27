#!/bin/bash
./wait-for-it.sh postgres:5432 -t 5
./wait-for-it.sh minio:9000 -t 5

npx prisma generate
npx prisma migrate deploy

npm run seed

npm run start