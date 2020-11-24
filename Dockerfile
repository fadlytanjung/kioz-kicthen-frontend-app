FROM telkomindonesia/alpine:nodejs-8.9.3

# Set Arguments On Build
ARG ARGS_NODE_BUILD=development

# Set Environment Variable
ENV ARGS_NODE_START=${ARGS_NODE_BUILD}
ENV BABEL_DISABLE_CACHE=1

# Set Working Directory
WORKDIR /usr/src/app

# Copy Node Packages Requirement
COPY package*.json ./

# Install Node Modules Based On Node Packages Requirement
RUN apk add --update --no-cache --virtual .build-dev \
      build-base \
      python \
      python-dev \
    && npm i -g npm \
    && npm i -g node-gyp \
    && npm i \
    && apk del .build-dev

# Copy Node Source Code File
COPY . .

# Build Node Source Code File
RUN npm run build:${ARGS_NODE_START}

# Change Working User to "User"
USER user

# Expose Application Port
EXPOSE 4000

# Run The Application
CMD ["npm", "start"]


