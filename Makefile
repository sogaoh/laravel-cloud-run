.PHONY:

help:
	cat Makefile

init:
	docker-compose -f ./create-project.yml run composer create-project --prefer-dist laravel/laravel .

vendor:
	docker-compose -f ./create-project.yml run composer install

