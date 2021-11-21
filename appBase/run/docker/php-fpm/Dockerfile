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
    apk add --no-cache --virtual .php-builds oniguruma-dev postgresql-dev icu-dev libzip-dev git zip unzip make && \
    docker-php-ext-install intl mbstring zip pdo pdo_pgsql

# Xdebug
RUN apk add --no-cache $PHPIZE_DEPS
RUN pecl install xdebug-3.0.0 && \
    docker-php-ext-enable xdebug

# TimeZone
ARG TZ

RUN set -eux && \
    apk add --no-cache tzdata && \
    cp -r /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone


# php.ini
COPY docker/php-fpm/php.ini /usr/local/etc/php/php.ini
COPY docker/php-fpm/zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf


WORKDIR /work

EXPOSE 8090

ENTRYPOINT ["make","serve"]
