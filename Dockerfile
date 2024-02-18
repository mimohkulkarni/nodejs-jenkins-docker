FROM node

ADD . .

RUN npm install
RUN npm install typescript -g
RUN npm run build
RUN tsc

ENTRYPOINT [ "npm", "start" ]
