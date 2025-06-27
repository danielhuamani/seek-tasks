FROM python:3.11-slim

WORKDIR /app

COPY ./requirements ./requirements
RUN pip install -r ./requirements/local.txt

COPY . .

# Copia config de nginx y supervisor
COPY docker/produccion/nginx.conf /etc/nginx/nginx.conf
COPY docker/produccion/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 8000 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
