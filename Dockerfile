FROM alpine:3

RUN apk update \
    && apk add --no-cache \
        bash \
        curl \
        gdal-dev \
        geos-dev \
        git \
        openssl \
        proj-dev \
        poetry \
        python3-dev \
        py3-pip

# Set the working directory
WORKDIR /app

# Copy the dependencies file to the working directory
COPY pyproject.toml poetry.lock ./

# Install Python packages
RUN poetry install

# Configure alises for development
RUN echo "export PS1='\[\e[32m\][\[\e[m\]\[\e[31m\]\u\[\e[m\]\[\e[33m\]@\[\e[m\]\[\e[32m\]\h\[\e[m\]:\[\e[36m\]\w\[\e[m\]\[\e[32m\]]\[\e[m\] '" >> ~/.bashrc
RUN echo "alias ls='ls --color=auto'" >> ~/.bashrc
RUN echo "alias ll='ls -laF --color=auto'" >> ~/.bashrc
RUN echo "alias lt='ls -lt --color=auto'" >> ~/.bashrc
