FROM redis:6.2-alpine

# TimeZone
ARG TZ

RUN set -eux && \
    cp -r /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone
