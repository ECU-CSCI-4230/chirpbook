#!/bin/sh

if [  "$#" -eq 0 ]; then
    echo "You must provide the npm commands to execute on start up.";
    echo "For example:";
    echo "./start.sh install start";
    echo "Will execute npm install then npm start.";
else
    for arg in "$@"
    do
        echo "$arg";
        npm $arg;
    done
fi