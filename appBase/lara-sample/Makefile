.PHONY:

help:
	cat Makefile



vendor: composer.json composer.lock
	composer self-update
	composer validate
	composer install ${NO_DEV}


dump:
	composer dump-autoload

clear:
	composer clear-cache
	php artisan view:clear
	php artisan route:clear
	php artisan clear-compiled
	php artisan config:cache
	php artisan cache:clear

clr: clear dump


version:
	php artisan --version

serve:
	php artisan migrate    # init
	php artisan serve --host=0.0.0.0
