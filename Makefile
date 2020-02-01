up:
	docker-compose up
build:
	docker-compose build

drop:
	docker-compose rm -s -f

test: up
	docker-compose run test npm run test

ref:
	docker-compose run test npm run backstop:ref

backstop:
	docker-compose run test npm run test:ci

unit:
	docker-compose run test npm run test:unit

lint:
	docker-compose run test npm run lint
