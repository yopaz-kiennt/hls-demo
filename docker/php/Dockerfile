FROM php:8.3-fpm-alpine

LABEL maintainer="Pham Dang Thang"

WORKDIR /var/www

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN apk update && apk add \
    supervisor \
    build-base \
    freetype-dev \
    linux-headers \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    oniguruma-dev \
    curl \
    libffi-dev \
    cmake \
    autoconf \
    libtool \
    make \
    gcc \
    g++ \
    openssl-dev \
    linux-headers

COPY php.ini /usr/local/etc/php/php.ini

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd sockets
RUN docker-php-ext-configure gd

RUN apk add autoconf && pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis && apk del autoconf

# Install RabbitMQ
RUN git clone --recursive https://github.com/alanxz/rabbitmq-c.git /tmp/rabbitmq-c \
    && cd /tmp/rabbitmq-c \
    && mkdir build && cd build \
    && cmake -DCMAKE_BUILD_TYPE=Release .. \
    && make && make install \
    && rm -rf /tmp/rabbitmq-c
RUN pecl install amqp && docker-php-ext-enable amqp

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN rm -rf /var/cache/apk/*

COPY supervisord.conf /etc/supervisord.conf
CMD supervisord -n -c /etc/supervisord.conf
