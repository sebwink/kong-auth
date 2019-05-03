API_COMPOSE=api/docker/compose
UI_COMPOSE=ui/docker/compose
COMPOSE=docker/compose
DOCKER_COMPOSE=docker-compose --project-directory $(COMPOSE)

API_BASE=-f $(API_COMPOSE)/base.yml
API_DEV=$(API_BASE) -f $(API_COMPOSE)/dev.yml
API_KONG_SETUP=-f $(API_COMPOSE)/kong-setup.yml
API_KONG_TEARDOWN=-f $(API_COMPOSE)/kong-teardown.yml

UI_BASE=-f $(UI_COMPOSE)/base.yml
UI_DEV=$(UI_BASE) -f $(UI_COMPOSE)/dev.yml 
UI_KONG_SETUP=-f $(UI_COMPOSE)/kong-setup.yml 
UI_KONG_TEARDOWN=-f $(UI_COMPOSE)/kong-teardown.yml

UI_IMAGES=kong-auth-ui \
		  kong-auth-ui-kong-setup \
		  kong-auth-ui-kong-teardown 
API_IMAGES=kong-auth-api \
		   kong-auth-api-kong-setup \
		   kong-auth-api-kong-teardown 
_IMAGES=$(UI_IMAGES) $(API_IMAGES)
IMAGES=$(patsubst %, sebwink/%, $(_IMAGES))

UI_PATHS=-f $(COMPOSE)/ui-paths.dev.yml
API_PATHS=-f $(COMPOSE)/api-paths.dev.yml
SETUP_PATHS=-f $(COMPOSE)/setup-paths.dev.yml
TEARDOWN_PATHS=-f $(COMPOSE)/teardown-paths.dev.yml

API_BUILD=$(API_DEV) $(API_KONG_SETUP) $(API_KONG_TEARDOWN)
UI_BUILD=$(UI_DEV) $(UI_KONG_SETUP) $(UI_KONG_TEARDOWN)
BUILD=$(API_BUILD) $(UI_BUILD) $(API_PATHS) $(UI_PATHS) $(SETUP_PATHS) $(TEARDOWN_PATHS)

UPDOWN=$(UI_DEV) $(API_DEV) $(UI_PATHS) $(API_PATHS)
SETUP=$(UI_KONG_SETUP) $(API_KONG_SETUP) $(SETUP_PATHS)
TEARDOWN=$(UI_KONG_TEARDOWN) $(API_KONG_TEARDOWN) $(TEARDOWN_PATHS)

all: $(_IMAGES)
	echo "DONE"

.secrets/dev.env:
	mkdir -p .secrets 
	touch .secrets/dev.env

Makefile:
	echo "Makefiles are weird!"

%: .secrets/dev.env
	$(DOCKER_COMPOSE) $(BUILD) build $@

up: .secrets/dev.env
	$(DOCKER_COMPOSE) $(UPDOWN) up

down: .secrets/dev.env
	$(DOCKER_COMPOSE) $(UPDOWN) rm --stop --force

kong-setup: .secrets/dev.env
	$(DOCKER_COMPOSE) $(SETUP) up
	$(DOCKER_COMPOSE) $(SETUP) rm --stop --force

kong-teardown: .secrets/dev.env
	$(DOCKER_COMPOSE) $(TEARDOWN) up
	$(DOCKER_COMPOSE) $(TEARDOWN) rm --stop --force 

kong-up: kong-setup up 
	echo "KONG UP"

kong-down: kong-teardown down 
	echo "KONG DOWN"

rmi:
	docker rmi $(IMAGES)

clean:
	rm -r .secrets
