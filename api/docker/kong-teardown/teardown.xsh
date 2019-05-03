#!/usr/bin/env xonsh

def deleteRoute(name):
    return $(
        curl --silent -X DELETE \
             --url http://kong:8001/routes/@(name)
    )

def deleteService(name):
    return $(
        curl --silent -X DELETE \
             --url http://kong:8001/services/@(name)
    )

if __name__ == '__main__':
	deleteRoute('register')
	deleteService('register')
	deleteRoute('account')
	deleteService('account')
	deleteRoute('get-login')
	deleteRoute('post-login')
	deleteService('login')
	deleteRoute('logout')
	deleteService('logout')
