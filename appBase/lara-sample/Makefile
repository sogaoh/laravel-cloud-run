.PHONY:

# Options
SEED   := --seed
NO_DEV :=
MODE   := pack
FORCE  :=

help:
	cat Makefile


# nginx-node
npmi:
	npm i
npmw:
	npm run watch
npmiw: npmi npmw
npmd:
	npm run dev
npmid: npmi npmd
npmp:
	npm run prod
npmip: npmi npmp
npmpack:
	npm run package
npmipack: npmi npmpack


# Vue.js build
npm-run: npmi
	npm run $(MODE)

# laravel
compi:
	composer install $(NO_DEV)
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
clr: vendor clear dump


version:
	php artisan --version

serve:
	#php artisan migrate
	php artisan serve --host=0.0.0.0

csd:
	#vender/bin/php-cs-fixer fix -v --diff --dry-run
	composer check-style
cs:
	#vender/bin/php-cs-fixer fix -v --diff
	composer fix-style

test: vendor
	vendor/bin/phpunit --configuration=phpunit.xml
coverage: vendor
	vendor/bin/phpunit --configuration=phpunit.xml --coverage-html storage/coverage
#dusk:
#	php artisan dusk

migrate:
	@make clr
	php artisan migrate $(FORCE)
fresh:
	@make clr
	php artisan migrate:fresh $(SEED) $(FORCE)


# one time
key:
	php artisan key:generate
	@make clr
#jwt:
#	php artisan jwt:secret
link:
	php artisan storage:link
dev-tools:
	composer require doctrine/dbal "^2"
	composer require --dev barryvdh/laravel-ide-helper
	composer require --dev beyondcode/laravel-dump-server
	composer require --dev barryvdh/laravel-debugbar
	composer require --dev roave/security-advisories:dev-master
	php artisan vendor:publish --provider="BeyondCode\DumpServer\DumpServerServiceProvider"
	php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
#dusk-init:
#	composer require --dev laravel/dusk
#	php artisan dusk:install
