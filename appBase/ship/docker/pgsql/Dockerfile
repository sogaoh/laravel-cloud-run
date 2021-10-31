FROM postgres:13-alpine

# TimeZone
ARG TZ

RUN set -eux && \
    cp -r /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone


CMD ["postgres"]

EXPOSE 5432

