const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['798257016291459083'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} **Bu komutu kullanmak için yetkin bulunmamakta.**`)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
  
const tag = 'र'   
const erkekrol = message.guild.roles.cache.find(r => r.id === '798257045442527272') 
const erkekrol2 = message.guild.roles.cache.find(r => r.id === '798257044301152257')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '798257046914334731')
const genelchat = message.guild.channels.cache.find(c => c.id === '804746434829353022')
const savelog = message.guild.channels.cache.find(c => c.id === '800310637922091048')


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} **bir kullanıcı belirt.**`)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Bir isim belirtmelisin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(!age) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Bir yaş belirtmelisin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Kendini kayıt edemezsin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Bot kayıt edemezsin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Sunucu sahibini kayıt edemezsin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
  
  
datab.add(`yetkili.${message.author.id}.kadin`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkekrol)
member.roles.add(erkekrol2)
member.roles.remove(kayıtsız)


message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${member} **Üyesini** ${message.author} **Teyit Etti.** \n\n ${erkekrol}, ${erkekrol2} **Rolleri Verildi.** \n \`${tag} ${name} | ${age}\` **Olarak ismi güncellendi.**`)
.setFooter(`Toplam kayıtların: ${alldata}`)               
.setColor('#2e042c'))
  
genelchat.send(new MessageEmbed()
.setAuthor("MAЯIΛ #TAGALIM")
.setDescription(`<@${member.id}> **Aramıza Hoş Geldin, <#798257143236395019> Kanalını Okumayı Unutma İyi Eğlenceler Dileriz.** <a:kalp_1:798150464754548746>`)
.setColor('#2e042c'))
  
savelog.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`<a:maria__tac:798886561428275211> **Yetkili:** ${message.author} | \`${message.author.id}\`\n<a:maria__tac:798886561428275211> **Kullanıcı:** ${member} | \`${member.id}\`\n<a:maria__tac:798886561428275211> **Güncel İsim:** \`${tag} ${name} | ${age}\`\n<a:maria__tac:798886561428275211> **Roller:** ${erkekrol}, ${erkekrol2} \n<a:maria__tac:798886561428275211> **Kanal:** <#${message.channel.id}> | \`${message.channel.id}\`\n<a:maria__tac:798886561428275211> **Kayıtlar:** \`${alldata}\` `)
.setColor('#2e042c'))

//atab.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (<@&798257045442527272>)`);
//atab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name, yas: age, role: eerkekrol.id)}

datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name, yas: age, role: "<@&798257045442527272>, <@&798257044301152257>"})};exports.conf = {enabled: true, guildOnly: true, aliases: ["erkek","e"], permLevel: 0}
exports.help = {name: 'erkek', description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.", usage: '.erkek @etiket/id İsim Yaş'}