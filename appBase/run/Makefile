.PHONY:

help:
	cat Makefile

# environments
chmod:
	docker-compose exec app chmod -R a+w storage
	docker-compose exec app chmod -R a+w bootstrap/cache
local:
	\cp -p .env.local .env

upmod:
	@make up
	@make chmod

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
node:
	docker-compose exec node ash
