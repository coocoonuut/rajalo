FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx prisma generate || true

EXPOSE 3000

CMD ["npm", "run", "dev"]