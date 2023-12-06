#!/bin/bash

#Save Route, speichert Daten
echo "Test speichert"
curl -X POST -H 'Content-Type: application/json' http://localhost:3000/save -d '{"taskname":"Einkaufen gehen", "taskstatus": "open"}'

#List Route, listet Daten auf
echo "Test auflisten:"
curl -X POST -H 'Content-Type: application/json' http://localhost:3000/list

#Update Route, updated Taskstatus
echo "Taskstatus updaten:"
curl -X POST -H 'Content-Type: application/json' http://localhost:3000/update -d '{"id":"5"}'

#Delete Route, löscht Daten
echo "Test löschen:"
curl -X POST -H 'Content-Type: application/json' http://localhost:3000/delete -d '{"id":"17"}'

