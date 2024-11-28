# Makefile

# Variables
DOCKER_COMPOSE_FILE=docker-compose.yml
DOCKER_COMPOSE=docker-compose -f $(DOCKER_COMPOSE_FILE)

.PHONY: up down build build-up setup init start stop restart logs

# Start the containers
up:
	$(DOCKER_COMPOSE) up -d

# Stop the containers
down:
	$(DOCKER_COMPOSE) down

# Build or rebuild services
build:
	$(DOCKER_COMPOSE) build

build-up:
	$(DOCKER_COMPOSE) up -d --build

setup: build-up

init:
		cp .env.docker .env
		$(DOCKER_COMPOSE) exec -it app sh -c "\
			composer install \
			&& php artisan key:generate \
			&& php artisan migrate \
			&& php artisan db:seed \
			&& php artisan storage:link \
			&& chmod -R 775 storage bootstrap/cache \
		"

# Start the containers (without rebuilding)
start:
	$(DOCKER_COMPOSE) start

# Stop the containers
stop:
	$(DOCKER_COMPOSE) stop

# Restart the containers
restart:
	$(DOCKER_COMPOSE) restart

# View logs
logs:
	$(DOCKER_COMPOSE) logs -f

# Remove stopped containers and unused images, networks, and volumes
clean:
	$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans
