#!/usr/bin/env xonsh

import json 

def loadsJson(f):

    def _f(*args, **kwargs):
        ret = f(*args, **kwargs)
        return json.loads(ret)

    return _f

@loadsJson
def registerKongAuthUiService():
    return $(
        curl --silent -X POST \
             --url http://kong:8001/services \
             --data 'name=kong-auth-ui' \
             --data 'url=http://kong-auth-ui:3000/'
    )


@loadsJson 
def registerKongAuthUiServiceRoute():
    return $(
        curl --silent -X POST \
             --url http://kong:8001/services/kong-auth-ui/routes \
             --data 'name=kong-auth-ui' \
			 --data 'methods[]=GET' \
             --data 'methods[]=POST' \
             --data 'methods[]=DELETE' \
             --data 'methods[]=PUT' \
			 --data 'paths[]=/auth/ui'
    )

if __name__ == '__main__':
    registerKongAuthUiService()
    registerKongAuthUiServiceRoute()
