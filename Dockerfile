FROM mbesoftware/mbewhatsapp:latest

RUN git clone https://github.com/mbesoftware/MBE-WOK /root/MBE-WOK
WORKDIR /root/MBE-WOK/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN npm install

CMD ["node", "bot.js"]
