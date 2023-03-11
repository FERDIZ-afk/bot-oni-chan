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
COPY . .
RUN npm install pm2 -g
RUN npm install -g npm@9.1.2

RUN yarn add wa-sticker-formatter
RUN yarn add @ffmpeg-installer/ffmpeg

RUN pwd
RUN ls

# khusus command kalau make Baileys versi github 
#RUN cd node_modules/@adiwajshing/baileys && npm run build:tsc && cp src/Defaults/baileys-version.json lib/Defaults/baileys-version.json
#RUN cp node_modules/@adiwajshing/baileys/src/Defaults/baileys-version.json node_modules/@adiwajshing/baileys/lib/Defaults/baileys-version.json
#RUN ls node_modules/@adiwajshing/baileys/lib/Defaults

RUN ls

#ngak guna tapi jangan di ilangin     "postinstall": "npm i typescript -g && tsc -p ./node_modules/@adiwajshing/baileys/ && cp ./node_modules/@adiwajshing/baileys/src/Defaults/baileys-version.json ./node_modules/@adiwajshing/baileys/lib/Defaults/baileys-version.json"


#awal pm2
#USER PM2 DI SINI kalau mau makek pm2 yang CMD ["npm","run","dev"] di Block aja command nya

# RUN npm install pm2 -g
# ENV PM2_PUBLIC_KEY isidisini
# ENV PM2_SECRET_KEY isidisini
# CMD pm2-runtime start run.js --name botwa

#akhir pm2

EXPOSE 5000
#CMD ["npm","run","dev"] #run via nodemon

CMD pm2-runtime start pm2run.js --name bot && \
pm2 list & \
pm2 monitor