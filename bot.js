const Discord = require("discord.js"); //
const client = new Discord.Client(); //
const ayarlar = require("./ayarlar.json"); //
const chalk = require("chalk"); //
const moment = require("moment"); //
var Jimp = require("jimp"); //
const { Client, Util } = require("discord.js"); //
const fs = require("fs"); //
const db = require("quick.db"); //
const express = require("express"); //
require("./util/eventLoader.js")(client); //
const path = require("path"); //
const snekfetch = require("snekfetch"); //
const ms = require("ms"); //
//

var prefix = ayarlar.prefix; //
//
const log = message => {
  //
  console.log(`${message}`); //
};

client.commands = new Discord.Collection(); //
client.aliases = new Discord.Collection(); //
fs.readdir("./komutlar/", (err, files) => {
  //
  if (err) console.error(err); //
  log(`${files.length} komut yüklenecek.`); //
  files.forEach(f => {
    //
    let props = require(`./komutlar/${f}`); //
    log(`Yüklenen komut: ${props.help.name}.`); //
    client.commands.set(props.help.name, props); //
    props.conf.aliases.forEach(alias => {
      //
      client.aliases.set(alias, props.help.name); //
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\

client.on("guildMemberAdd", member => {
  require("moment-duration-format");
  var üyesayısı = member.guild.members.cache.size
    .toString()
    .replace(/ /g, "    ");
  var üs = üyesayısı.match(/([0-9])/g);
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
        "0": `<a:10:800300887175593994>`,
        "1": `<a:11:800300885628289054>`,
        "2": `<a:12:800300994830532618>`,
        "3": `<a:13:800300994839314478>`,
        "4": `<a:14:800300886857482272>`,
        "5": `<a:15:800300885388427305>`,
        "6": `<a:16:800300994093252629>`,
        "7": `<a:17:800300994550300702>`,
        "8": `<a:18:800300887494492160>`,
        "9": `<a:19:800300886937042945>`
      }[d];
    });
  }
  const kanal = member.guild.channels.cache.find(
    r => r.id === "798623371193483304"
  );
  let register = "798257016291459083";
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gecen = moment
    .duration(kurulus)
    .format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]**`);
  var kontrol;
  if (kurulus < 1296000000)
    kontrol = "**Hesap Durumu:** `Güvenilmez` <a:carpi:800296605487726602>";
  if (kurulus > 1296000000)
    kontrol = "**Hesap Durumu:** `Güvenilir` <a:tik:800296547844620288>";
  moment.locale("tr");
  const embed = new Discord.MessageEmbed()
    .setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setColor("#2e042c")

    .setDescription(
      `
<a:kelebek_1:799698967381671966> <@` +
        member.id +
        `> **Sunucumuza Hoşgeldin**
  
<a:kelebek_1:799698967381671966> **Kayıt olmak için Confirmation odasında** <@&798257016291459083> **yetkililerine ses teyit vermen yeterlidir**
  
<a:kelebek_1:799698967381671966> **Seninle beraber** ` +
        üyesayısı +
        ` **bukadar kişiyiz.**
  
<a:kelebek_1:799698967381671966> **Sunucumuzun kurallarını <#798257143236395019> kanalında belirtilmiştir.**

<a:kelebek_1:799698967381671966> **MAЯIΛ sunucumuzun tagını  (\`र\`) alarak bizlere destek olabilirsin.**`
    )
    .setImage(
      `https://cdn.glitch.com/d55080d2-71df-40d9-abb8-a49e6f817002%2Fezgif.com-gif-maker%20(5).gif?v=1610878088313`
    );
  kanal.send(embed);
  kanal.send(`<@&${register}>`);
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\

//-----------------------OTO ROL VERME ----------------------\\
client.on("guildMemberAdd", member => {
  member.roles.add("798257046914334731"); // aq buğrası ikide bir dc patlıyor şuraya ıd girersin unregister
});

//-----------------------OTO ROL VERME ----------------------\\

//------------------------------------------------------------------------------------------------------------------------------------\\

client.on("guildMemberAdd", member => {
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var { Permissions } = require("discord.js");
  var x = moment(member.user.createdAt)
    .add(7, "days")
    .fromNow();
  var user = member.user;
  x = x.replace("birkaç saniye önce", " ");
  if (!x.includes("önce") || x.includes("sonra") || x == " ") {
    const kytsz = member.guild.roles.cache.find(
      r => r.id === "798257046914334731"
    );
    var rol = member.guild.roles.cache.get("798257050114719745"); // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
    var kayıtsız = member.guild.roles.cache.get(kytsz); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
    member.roles.add(rol);
    member.roles.remove(kytsz);

    member.user.send(
      "Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır."
    );
    setTimeout(() => {}, 1000);
  } else {
  }
});
//------------------------------------------------------------------------------------------------------------------------------------\\

//YASAKLI TAG

client.on("guildMemberAdd", member => {
  if (member.user.username.includes("✰")) {
    member.roles.add("798257050962493471");
    member.roles.remove("798257046914334731");
    member.send("Sunucumuzun Yasaklı Tagında Bulunuyorsunuz!");
  }
});

//-----------------------TAG-ROL----------------------\\

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("793057418099425340"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "र"; // Buraya Ekip Tag
  var tagrol = "798257034180165642"; // Buraya Ekip Rolünün ID
  var logKanali = "798257182277632010"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.cache.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(
        `**Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.**`
      );
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `${yeni} **Adlı üye tagımızı alarak aramıza katıldı!**`
            )
        );
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(
        uye.roles.cache.filter(
          rol => rol.position >= sunucu.roles.cache.get(tagrol).position
        )
      );
      await uye.send(
        `**Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı**\n\n**Tagımızı tekrar alıp aramıza katılmak istersen;**\n**Tagımız:** ${tag}`
      );
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
              `${yeni} **Adlı kullanıcı tagımızı bırakarak aramızdan ayrıldı**`
            )
        );
    } catch (err) {
      console.error(err);
    }
  }
});

//----------------------TAG-KONTROL----------------------\\

client.on("guildMemberAdd", member => {
  let sunucuid = "793057418099425340"; //Buraya sunucunuzun IDsini yazın
  let tag = "र"; //Buraya tagınızı yazın
  let rol = "798257034180165642"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  if (member.user.username.includes(tag)) {
    member.roles.add(rol);
    const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> **Adlı kullanıcı zaten tagımızdaymış**`)
      .setTimestamp();
    client.channels.cache.get("798257182277632010").send(tagalma);
  }
});

//-----------------------TAG-KONTROL----------------------\\

//BOTU SESE SOKMA
client.on("ready", async function() {
  const voiceChannel = "798257176749408307";
  client.channels.cache
    .get(voiceChannel)
    .join()
    .catch(err => {
      throw err;
    });
});

client.on("guildMemberAdd", member => {
  member.setNickname("र İsim | Yaş"); ////YENI GELENLERE VERILCEK ISIM
});
