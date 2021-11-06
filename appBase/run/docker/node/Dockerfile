FROM node:16-alpine as node
FROM nginx:1.21-alpine

SHELL ["/bin/ash", "-oeux", "pipefail", "-c"]

# TimeZone
ARG TZ

RUN set -eux && \
    cp -r /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone

RUN apk update && \
  apk add --update --no-cache --virtual=.build-dependencies bash make g++

# node command
COPY --from=node /usr/local/bin /usr/local/bin
# npm command
COPY --from=node /usr/local/lib /usr/local/lib
# yarn command
COPY --from=node /opt /opt

# nginx config file
#COPY ./docker/node/default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /root/.npm/_logs && \
    chmod 777 /root/.npm/_logs

WORKDIR /work
