FROM python:3.11-alpine
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/main \
    && apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing \
    gdal-dev \
    geos-dev \
    && pip install --upgrade pip \
    && pip install pipenv\
    && apk add jpeg-dev zlib-dev libjpeg \
    && apk add gcc musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev fontconfig ttf-dejavu  \
    && apk add xvfb \
    && apk add ttf-freefont fontconfig \
    && apk add git
WORKDIR /app

COPY ./requirements ./requirements
RUN pip install -r ./requirements/local.txt

COPY . .

# Copia config de nginx y supervisor
COPY docker/produccion/nginx.conf /etc/nginx/nginx.conf
COPY docker/produccion/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 8000 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
