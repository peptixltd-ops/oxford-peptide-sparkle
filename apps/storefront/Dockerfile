FROM node:22-bookworm-slim
WORKDIR /srv
COPY packages packages
COPY apps/storefront apps/storefront
WORKDIR /srv/apps/storefront
RUN npm install && npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
