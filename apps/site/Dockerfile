# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# используем именно файлы из текущего контекста (apps/site)
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN pnpm install --no-frozen-lockfile

# копируем весь сайт и собираем
COPY . .
RUN pnpm build

# Run stage: статическая раздача
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./
RUN npm i -g serve
EXPOSE 4321
CMD ["serve", "-l", "4321", "."]
