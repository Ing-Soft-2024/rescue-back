# COMMON BASE IMAGE FOR DEV AND PROD
FROM node:20-alpine as base
WORKDIR /app

FROM base as development
COPY package*.json ./
COPY rbac.conf ./
COPY policies.csv ./
## ADDING PATCHES
COPY ./patches ./patches

# ADDING DEPENDENCIES AND SOURCE
RUN npm i --include prod
# RUN npx patch-package
# RUN ls
RUN cp -R node_modules /tmp/node_modules
RUN npm i
COPY . .

FROM development as builder
RUN npx babel src -d dist

FROM base as release
ENV PORT=8000
ENV PRODUCTION=true

COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/rbac.conf ./
COPY --from=builder /app/policies.csv ./
EXPOSE 8000
CMD ["node", "./dist/index.js"]