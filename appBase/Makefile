.PHONY:

help:
	cat Makefile

PRODUCT_NAME := laravel-cloud-run

IMG_TAG := latest
NODEV := --no-dev
MODE  := pack

BLDARG_TZ        := --build-arg TZ=Asia/Tokyo
BLDARG_NODEV_OPT := --build-arg NO_DEV_OPT=$(NODEV)



# environments
local:
	\cp -p .env.local .env


# build
build:
	docker build --no-cache -t $(PRODUCT_NAME)/lara-sample:$(IMG_TAG) -f ./ship/docker/php-fpm/Dockerfile $(BLDARG_TZ) $(BLDARG_NODEV_OPT) .
# tag
tag:
	#docker tag $(PRODUCT_NAME)/lara-sample:$(IMG_TAG)
# push
push:
	#docker push



# up/down
up:
	docker-compose up -d
upb:
	docker-compose up -d --build
down:
	docker-compose down --remove-orphans
prune:
	docker system prune --volumes
restart:
	@make down
	@make up

# exec
app:
	docker-compose exec app ash
db:
	docker-compose exec db ash
redis:
	docker-compose exec redis ash


# logs
log-a:
	docker-compose logs -f app

