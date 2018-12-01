# Dockerfile (tag: v3)
FROM mhart/alpine-node:8
RUN apk add --no-cache git
ADD . /chronist
WORKDIR /chronist
RUN npm install
ENV NODE_ENV=development
ENV PORT=3000
CMD [ "npm", "start" ]
EXPOSE 3000