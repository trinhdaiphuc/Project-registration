FROM node:10-alpine as builder

WORKDIR /app

RUN apk --no-cache add \
  g++ make python git \
  && npm install -g node-gyp \
  && rm -rf /var/cache/apk/*

ADD package.json package-lock.json /app/

RUN npm install

# Runtime image from here

FROM node:10-alpine
RUN apk --no-cache add \
  ca-certificates \
  lz4-libs \
  musl \
  cyrus-sasl \
  openssl

WORKDIR /app/

# Copy node_modules from builder image
ADD . /app
COPY --from=builder /app/node_modules /app/node_modules