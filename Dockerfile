FROM node:20-alpine

# Install necessary dependencies to the OS for a secure database connection (TLS/SSL)
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "dev"]