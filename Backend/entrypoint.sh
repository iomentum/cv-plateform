#!/bin/bash
./wait-for-it.sh postgres:5432 -t 5

npx prisma generate
npx prisma migrate deploy

npm run start