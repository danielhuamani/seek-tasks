#!/bin/bash

# Variables
MONGO_DB="seek_tasks_test"
MONGO_USER="test_user"
MONGO_PASS="test_password"

# Comando para crear usuario y base de datos
mongo <<EOF
use $MONGO_DB
db.createUser({
  user: "$MONGO_USER",
  pwd: "$MONGO_PASS",
  roles: [{ role: "readWrite", db: "$MONGO_DB" }]
})