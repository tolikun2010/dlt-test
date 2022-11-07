FROM node:16-alpine AS deps

WORKDIR /server

COPY package.json package-lock.json ./

RUN npm ci

FROM node:16-alpine AS builder
WORKDIR /server
COPY --from=deps /server/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:16-alpine AS runner
WORKDIR /server
ENV NODE_ENV production

COPY --from=builder /server/package.json ./package.json
COPY --from=builder /server/dist ./dist
COPY --from=builder /server/node_modules ./node_modules

EXPOSE 2222
ENV PORT 2222

CMD ["npm", "run", "start"]