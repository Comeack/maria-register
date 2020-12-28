const Discord = require('discord.js');
const data = require('quick.db');
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
  let prefix = ayarlar.prefix
if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Bu Komutu Kullanmak İçin İzniniz **\`Mesajları_Yönet\`** Yok!`));
  
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription('**Lütfen Silinicek Mesaj Miktarını Yazın.!** 🚫'));
  
if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`**\`100\`**'ün Üzerinde **Mesaj Silemem!**\n\n Lütfen Birdaha Dene`));
  
message.channel.bulkDelete(args[0]);
  
return message.channel.send(new Discord.MessageEmbed().setColor('#00ff51').setDescription(`**\`${args[0]}\`** **Adet Mesajı Başarıyla Sildim...** <a:zynex_tik:757298515331383479>`)).then(m => m.delete({timeout: 5000}))


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil","clear","temizle"],
  permLevel: 0
}

exports.help = {
  name: 'sil'
};