const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello Express app!");
});
app.listen(3000, () => {
  console.log("server started");
});
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

const db = require("quick.db");

const owner = ["769590521328828457", "786163939532472331"];

client.on("ready", async () => {
  console.log(`"${client.user.username}" 1in ${client.guilds.cache.size}`);
});


const prefix = "!";

client.login(
  process.env.token
);
// client2.login(process.env.token2);
// client3.login(process.env.token3);

let count = [];
client.on("messageCreate", (message) => {
  if (message.content.startsWith("1bc")) {
    if (owner.includes(message.author.id)) {
      // console.log(message.member)
      // message.delete();
      const args = message.content.split(" ");
      if (!args[1]) return message.reply("args?");
      var argresult = args.slice(1).join(" ");
      // return console.log(argresult);

      try {
        message.guild.members.cache.forEach((member) => {
          // if (member.presence.status == "offline") return;
          if (member.user.bot) return;

          let point = `${db.get(`number`)}`;
          if (point > 800) return;

          let exist = db.get(`members_${member.id}`);
          if (exist) {
            return;
          } else {
            member
              .send(`${argresult}\n<@${member.id}>`)
              .then((m) => {
                console.log("Send To :" + m.channel.recipient.username);
              })
              .catch((er) => {
                console.log("Er " + er);
              });
            db.add(`members_${member.id}`, 1);
            db.add(`number`, 1);
          }
        });
      } catch (error) {
        console.log(error);
      }

      let embed = new Discord.MessageEmbed()
        .setDescription(`**Send Your Message Succesfully**`)
        .setColor("blue")
        .setTimestamp();

      message.channel.send({ embeds: [embed] }).then((m) => {
        setTimeout(() => {});
      });
    } else {
      message.reply("**`-`This Command For Admin Only.**");
    }
  }
});



// client2.on("message", message => {
//   if (message.content.startsWith('2bc')) {
//     if (!owner.includes(message.author.id)) return;
//     message.delete
//     args = message.content.split(" ").slice(1);
//     var argresult = args.join(' ');

//     message.guild.members.cache.forEach(member => {

//       if (member.presence.status == "offline") return

//       let point = (`${db.get(`number2`)}`)
//       if (point > 699) return
//       let exist = db.get(`members_${member.id}`)
//       if (exist) {
//         return
//       } else {
//         member.send(argresult)
//         db.add(`members_${member.id}`, 1)
//         db.add(`number2`, 1)
//       }
//     })

//     let embed = new Discord.MessageEmbed()
//       .setDescription(`**Done the message has been send\nthe message \`${args}\`**`)
//       .setColor('GREEN')
//       .setTimestamp()

//     message.channel.send(embed).then((m) => {
//       setTimeout(() => {
//         m.delete()
//       }, 10000);
//     })
//   }
// })

// client3.on("message", message => {
//   if (message.content.startsWith('3bc')) {
//     if (!owner.includes(message.author.id)) return;
//     message.delete
//     args = message.content.split(" ").slice(1);
//     var argresult = args.join(' ');

//     message.guild.members.cache.forEach(member => {

//       if (member.presence.status == "offline") return

//       let point = (`${db.get(`number3`)}`)
//       if (point > 699) return
//       let exist = db.get(`members_${member.id}`)
//       if (exist) {
//         return
//       } else {
//         member.send(argresult)

//         db.add(`members_${member.id}`, 1)

//         db.add(`number3`, 1)
//       }
//     })

//     let embed = new Discord.MessageEmbed()
//       .setDescription(`**Done the message has been send\nthe message \`${args}\`**`)
//       .setColor('GREEN')
//       .setTimestamp()

//     message.channel.send(embed).then((m) => {
//       setTimeout(() => {
//         m.delete()
//       }, 10000);
//     })
//   }
// })

client.on("message", (message) => {
  if (message.content.startsWith("delete")) {
    if (owner.includes(message.author.id)) {
      try {
        db.all().map((m) => db.delete(m.ID));
        let embed = new Discord.MessageEmbed()

          .setDescription(`**Done**`)

          .setColor("GREEN")
          .setTimestamp();

        message.channel.send({ embeds: [embed] }).then((m) => {
          setTimeout(() => {
            m.delete();
          }, 10000);
        });
      } catch (er) {
        message.reply("I can't !").then((m) => {
          setTimeout(() => {
            m.delete();
          }, 10000);
        });
        console.log(er);
      }
    } else {
      message.reply("**`-`This Command For Admin Only.**");
    }
  }
});
