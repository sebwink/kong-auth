SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
KEYPATH=$SCRIPTPATH/../.secrets

mkdir -p $KEYPATH

PRIVATE_KEY=$KEYPATH/private.pem
PUBLIC_KEY=$KEYPATH/public.pem

openssl genrsa -out $PRIVATE_KEY 2048
openssl rsa -in $PRIVATE_KEY -outform PEM -pubout -out $PUBLIC_KEY
