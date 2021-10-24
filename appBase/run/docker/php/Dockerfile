FROM php:8.0-fpm-alpine

# Composer environment
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
ENV PATH $PATH:/composer/vendor/bin

# tinker(psysh)
ARG PSYSH_DIR=/usr/local/share/psysh
#ARG PHP_MANUAL_URL=http://psysh.org/manual/ja/php_manual.sqlite


# Composer install
RUN set -eux && \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar /usr/local/bin/composer

RUN apk add --no-cache $PHPIZE_DEPS

# install Lib
RUN apk update && \
    apk add --no-cache --virtual .php-builds oniguruma-dev postgresql-dev git zip unzip && \
    docker-php-ext-install mbstring pdo pdo_pgsql

# TimeZone
ARG TZ

RUN set -eux && \
    apk add --no-cache tzdata && \
    cp -r /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone


# php.ini
COPY docker/php/php.ini /usr/local/etc/php/php.ini
COPY docker/php/zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf


WORKDIR /work

