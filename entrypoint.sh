#!/bin/sh

set -e # End the process on any failure

DB_HOST="database"
DB_PORT="3306"

echo "\nWaiting for database to be ready at ${DB_HOST}:${DB_PORT}..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo "\nDatabase is ready!"

echo "\nRunning Prisma migrations..."
npx prisma migrate deploy

echo "\nStarting Next.js app...\n"

exec "$@" # Replace this process with the following instructions...