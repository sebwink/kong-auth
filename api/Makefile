COMPOSE=docker/compose

BASE=-f $(COMPOSE)/base.yml
DEV=$(BASE) -f $(COMPOSE)/dev.yml
KONG_SETUP=-f $(COMPOSE)/kong-setup.yml
KONG_TEARDOWN=-f $(COMPOSE)/kong-teardown.yml

BUILD=$(DEV) $(KONG_SETUP) $(KONG_TEARDOWN)

_IMAGES=kong-auth-api \
        kong-auth-api-kong-setup \
		kong-auth-api-kong-teardown

IMAGES=$(patsubst %, sebwink/%, $(_IMAGES))

all: $(_IMAGES)
	echo "DONE building all images!"

%:
	docker-compose $(BUILD) build $@

up:
	docker-compose $(DEV) up 

down:
	docker-compose $(DEV) rm --stop --force

kong-setup:
	docker-compose $(KONG_SETUP) up
	docker-compose $(KONG_SETUP) rm --stop --force

kong-teardown:
	docker-compose $(KONG_TEARDOWN) up
	docker-compose $(KONG_TEARDOWN) rm --stop --force 

kong-up: kong-setup up
	echo "Started service and executed KONG setup."

kong-down: kong-teardown down 
	echo "Stopped service and executed KONG teardown."

rmi:
	docker rmi $(IMAGES)
