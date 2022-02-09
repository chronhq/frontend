# Dockerfile (tag: v3)
FROM mhart/alpine-node:12 AS dev
LABEL maintainer="Mikhail Orlov <miklergm@gmail.com>"

COPY . /chronmaps
WORKDIR /chronmaps
RUN npm clean-install

# Webpack dev-server
EXPOSE 3000
# Webpack bundle analyzer
EXPOSE 3001
ENV PORT=3000
# Use external server as a backend
ENV EXT=true

CMD ["npm", "run", "dev"]

## release image
FROM dev AS prerelease
RUN npm run release

FROM nginx:stable AS release
ENV HTML_FOLDER=/usr/share/nginx/html
COPY --from=prerelease /chronmaps/dist ${HTML_FOLDER}
COPY --from=prerelease /chronmaps/static ${HTML_FOLDER}
COPY 99-env-configs.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/99-env-configs.sh
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
