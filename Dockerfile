# specify the node base image with your desired version node:<version>

FROM node:16

# Copy our source file into the container

COPY starter /starter
COPY index.js /index.js
COPY package.json /package.json

# replace this with your application's default port

EXPOSE 8000

# Command to run when container starts up
RUN npm install

CMD npm  start
