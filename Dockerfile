FROM node:9.5.0-alpine

ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /server && cp -a /tmp/node_modules /server

WORKDIR /server
ADD . /server

EXPOSE 3000
ENTRYPOINT ["npm", "start"]