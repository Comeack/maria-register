const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } maria siker`
  );
  client.user.setStatus("online");
  client.user.setActivity("MAЯIΛ REGİSTER", { type: "WATCHING" }); //// TYPE - WATCHING , PLAYING , LISTENING gibi değiştirilebilir.
  console.log(`MARİA BOT AKTİF`);
};
