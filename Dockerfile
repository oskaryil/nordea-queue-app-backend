FROM  node:7.10.0-alpine

MAINTAINER Oskar Yildiz

RUN mkdir -p /app

WORKDIR /app

ADD package.json yarn.lock /app/

RUN yarn -D --pure-lockfile
RUN yarn global add pm2

COPY . /app/

EXPOSE 4000

RUN ["yarn", "build"]

CMD ["pm2", "start", "dist/index.bundle.js", "--no-daemon --watch -i 0 --name api"]

