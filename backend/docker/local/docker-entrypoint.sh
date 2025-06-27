#!/bin/sh
exec "$@"

exec fastapi dev /app/src/main.py --host 0.0.0.0
