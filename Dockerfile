FROM alpine:3

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR="/tmp/poetry_cache"

RUN apk --no-check-certificate update \
    && apk add --no-cache --no-check-certificate \
        bash \
        curl \
        docker \
        gdal-dev \
        geos-dev \
        git \
        npm \
        openssl \
        proj-dev \
        poetry \
        python3-dev \
        py3-pip

# Configure alises for development
RUN echo "export PS1='\[\e[32m\][\[\e[m\]\[\e[31m\]\u\[\e[m\]\[\e[33m\]@\[\e[m\]\[\e[32m\]\h\[\e[m\]:\[\e[36m\]\w\[\e[m\]\[\e[32m\]]\[\e[m\] '" >> ~/.bashrc
RUN echo "alias ls='ls --color=auto'" >> ~/.bashrc
RUN echo "alias ll='ls -laF --color=auto'" >> ~/.bashrc
RUN echo "alias lt='ls -lt --color=auto'" >> ~/.bashrc
