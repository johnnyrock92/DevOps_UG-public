#!/bin/sh

set -e
  
host="$1"
shift
cmd="$@"

>&2 echo "Czekam 8 sekund na Postgresa"

sleep 8
  
>&2 echo "Uruchamiam mybackend"
exec $cmd