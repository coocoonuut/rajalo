#!/bin/sh

echo "Running Prisma migrations..."

npx prisma migrate deploy

echo "Starting Next.js app..."

exec "$@" # Replace this process with the following instructions...