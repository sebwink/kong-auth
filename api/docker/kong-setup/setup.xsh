#!/usr/bin/env xonsh

import json

$KONG='http://kong:8001'

def loadsJson(f):
    
    def _f(*args, **kwargs):
        ret = f(*args, **kwargs)
        return json.loads(ret)

    return _f

@loadsJson
def registerSignupService():
    return $(
        curl --silent -X POST \
             --url $KONG/services \
             --data 'name=register' \
             --data 'url=http://kong-auth-api:5000/signup/'
    ) 

@loadsJson
def registerSignupServiceRoute():
    return $(
        curl --silent -X POST \
             --url $KONG/services/register/routes \
             --data 'name=register' \
             --data 'paths[]=/auth/api/signup' 
    )

@loadsJson
def registerAccountService():
    return $(
        curl --silent -X POST \
             --url $KONG/services \
             --data 'name=account' \
             --data 'url=http://kong-auth-api:5000/consumer/'
    )

@loadsJson
def registerAccountServiceRoute():
    return $(
        curl --silent -X POST \
             --url $KONG/services/account/routes \
			 --data 'name=account' \
             --data 'paths[]=/auth/api/account'
    )

@loadsJson
def enableBasicAuthOnRoute(routeId):
    return $(
        curl --silent -X POST \ 
             --url $KONG/routes/@(routeId)/plugins \
             --data 'name=basic-auth' \
             --data 'config.hide_credentials=false'
    )

@loadsJson
def registerAccessService():
    return $(
        curl --silent -X POST \
             --url $KONG/services \
             --data 'name=access' \
             --data 'url=http://kong-auth-api:5000/access/'
    )

@loadsJson
def registerAccessServiceRoute():
    return $(
        curl --silent -X POST \
             --url $KONG/services/access/routes \
             --data 'name=access' \
             --data 'paths[]=/auth/api/access'
    )

@loadsJson
def registerLoginService():
    return $(
        curl --silent -X POST \
             --url $KONG/services \
             --data 'name=login' \
             --data 'url=http://kong-auth-api:5000/login/'
    )

@loadsJson
def registerPostLoginRoute():
    return $(
        curl --silent -X POST \
             --url $KONG/services/login/routes \
             --data 'name=post-login' \
             --data 'paths[]=/auth/api/login' \
			 --data 'methods[]=POST'
    )

@loadsJson
def registerGetLoginRoute():
    return $(
        curl --silent -X POST \
             --url $KONG/services/login/routes \
             --data 'name=get-login' \
             --data 'paths[]=/auth/api/login' \
			 --data 'methods[]=GET'
    )

def registerLogoutService():
    return $(
        curl --silent -X POST \
             --url $KONG/services \
             --data 'name=logout' \
             --data 'url=http://kong-auth-api:5000/logout/'
    )

@loadsJson
def registerLogoutRoute():
    return $(
        curl --silent -X POST \
             --url $KONG/services/logout/routes \
             --data 'name=logout' \
             --data 'paths[]=/auth/api/logout' 
    )

@loadsJson 
def enableJwtForRoute(routeId):
    return $(
        curl --silent -X POST \
             --url $KONG/routes/@(routeId)/plugins \
             --data "name=jwt"
    )

@loadsJson 
def enableCookieJwtForRoute(routeId):
    return $(
        curl --silent -X POST \
             --url $KONG/routes/@(routeId)/plugins \
             --data "name=cookie_jwt" \
             --data "config.cookie_names[]=session"
    )

if __name__ == '__main__':
    # /signup
    registerSignupService()
    registerSignupServiceRoute()
    # /account
    registerAccountService()
    accountRouteId = registerAccountServiceRoute()['id']
    enableBasicAuthOnRoute(accountRouteId)
    # /access
    # registerAccessService()
    # accessRouteId = registerAccessServiceRoute()['id']
    # enableBasicAuthOnRoute(accessRouteId)
    # /login
    # JWT+Cookie-JWT for GET /login 
    registerLoginService()
    getLoginRouteId = registerGetLoginRoute()['id']
    enableJwtForRoute(getLoginRouteId)
    enableCookieJwtForRoute(getLoginRouteId)
    # Basic auth for POST /login 
    postLoginRouteId = registerPostLoginRoute()['id']
    enableBasicAuthOnRoute(postLoginRouteId)
    # /logout    
    registerLogoutService()
    logoutRouteId = registerLogoutRoute()['id']
    enableJwtForRoute(logoutRouteId)
    enableCookieJwtForRoute(logoutRouteId)
