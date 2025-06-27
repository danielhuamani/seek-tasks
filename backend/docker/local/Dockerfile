FROM python:3.11-alpine
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql \
    && apk add postgresql-dev \
    && apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/main \
    && apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing \
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

COPY ./docker/local/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
ENV PYTHONUNBUFFERED 1
EXPOSE 8000