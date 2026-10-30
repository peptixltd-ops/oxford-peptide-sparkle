FROM node:22-bookworm-slim
WORKDIR /srv
COPY package.json package-lock.json* ./
COPY apps/backend ./apps/backend
RUN npm install
WORKDIR /srv/apps/backend
ENV NODE_ENV=production
EXPOSE 9000
CMD ["npx", "medusa", "start"]
