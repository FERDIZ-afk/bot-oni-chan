FROM nikolaik/python-nodejs:latest
RUN apt update -y && apt upgrade -y
RUN apt-get install -y --no-install-recommends \
  neofetch \
  ffmpeg \
  wget \
  yarn \
  sudo \
  tesseract-ocr \
  imagemagick

ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /root/bot-oni-chan

RUN cd /root && git clone https://FERDIZ-afk: your token github@github.com/FERDIZ-afk/bot-oni-chan

RUN git pull

RUN yarn add @ffmpeg-installer/ffmpeg
RUN yarn add link-preview-js

RUN npm install pm2 -g

RUN cd node_modules/@adiwajshing/baileys && npm run build:tsc && cp src/Defaults/baileys-version.json lib/Defaults/baileys-version.json && cd /root/apibotv4

RUN cp node_modules/@adiwajshing/baileys/src/Defaults/baileys-version.json node_modules/@adiwajshing/baileys/lib/Defaults/baileys-version.json
RUN ls node_modules/@adiwajshing/baileys/lib/Defaults

RUN ls

#awal pm2
#USER PM2 DI SINI kalau mau makek pm2 yang CMD ["npm","run","dev"] di Block aja command nya

# RUN npm install pm2 -g
# ENV PM2_PUBLIC_KEY isidisini
# ENV PM2_SECRET_KEY isidisini
# CMD pm2-runtime start run.js --name botwa

#akhir pm2

EXPOSE 5000
#CMD ["npm","run","dev"] #run via nodemon

CMD pm2 start index.js && \
pm2 save & \
pm2 logs