FROM php:8.0-fpm-alpine

# Composer environment
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
ENV PATH $PATH:/composer/vendor/bin

# tinker(psysh)
ARG PSYSH_DIR=/usr/local/share/psysh
#ARG PHP_MANUAL_URL=http://psysh.org/manual/ja/php_manual.sqlite


# Composer install
COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer
RUN set -eux && \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar /usr/local/bin/composer

RUN apk add --no-cache $PHPIZE_DEPS

# install Lib
RUN apk update && \
    apk add --no-cache --virtual .php-builds oniguruma-dev postgresql-dev git zip unzip make && \
    docker-php-ext-install mbstring pdo pdo_pgsql

# TimeZone
ARG TZ

RUN set -eux && \
    apk add --no-cache tzdata && \
    cp -r /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone


COPY lara-sample /work


# php.ini
COPY ship/docker/php-fpm/php.ini /usr/local/etc/php/php.ini
COPY ship/docker/php-fpm/zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf
COPY ship/docker/php-fpm/docker.conf /usr/local/etc/php-fpm.d/docker.conf


WORKDIR /work


ARG NO_DEV_OPT
RUN composer install ${NO_DEV_OPT}

RUN if [ -n "${NO_DEV_OPT}" ]; then \
        rm -rf tests; \
        rm -rf _ide_helper*; \
        rm -rf .php_cs*; \
        rm -rf phpunit*; \
    fi

#RUN php artisan cache:clear && \
#    php artisan config:clear && \
#    php artisan route:clear && \
#    php artisan view:clear

RUN chown -R www-data:www-data .
RUN chmod -R a+w storage && \
    chmod -R a+w bootstrap/cache

EXPOSE 8080

ENTRYPOINT ["make","serve"]
