build:
	chmod +x ./backend/docker/initdb/create_test_db.sh
	docker-compose -f docker-compose.yml build
up:
	docker-compose -f docker-compose.yml up
down:
	docker-compose -f docker-compose.yml down
lint:
	docker-compose -f docker-compose.yml run --rm seek_web \
	sh -c "black src && isort src && flake8 src"
test:
	docker-compose -f docker-compose.yml run --rm seek_web pytest -v