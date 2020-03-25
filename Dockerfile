# Dockerfile (tag: v3)
FROM mhart/alpine-node:12 AS dev
LABEL maintainer="Mikhail Orlov <miklergm@gmail.com>"

COPY . /chronmaps
WORKDIR /chronmaps
RUN echo '{}' > disabled.json && \
  sed 's/MAPBOX_TOKEN/dummy_token/' settings.json.example > settings.json && \
  cp firebase-config.json.example firebase-config.json
RUN npm clean-install

# Webpack dev-server
EXPOSE 3000
# Webpack bundle analyzer
EXPOSE 3001
ENV PORT=3000
# Use external server as a backend
ENV EXT=true

CMD ["npm", "run", "dev"]

## Smaller image
# FROM mhart/alpine-node:slim-12 AS slim

# COPY --from=dev /chronmaps /chronmaps
# WORKDIR /chronmaps
# EXPOSE 3000
# EXPOSE 3001
# ENV PORT=3000
# ENV EXT=true
# CMD ["node", "./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config ./webpack.config.dev.js"]

## release image
FROM dev AS prerelease
ARG CFG_EXT=notset
RUN echo ${CFG_EXT}
RUN mv settings.json.${CFG_EXT} settings.json && mv firebase-config.json.${CFG_EXT} firebase-config.json
RUN npm run release

FROM nginx:stable-alpine AS release
COPY --from=prerelease /chronmaps/dist /usr/share/nginx/html
