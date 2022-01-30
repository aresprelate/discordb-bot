exports.run = async(client,message,args) => {
            let member = message.mentions.members.first();
            if(!member) { message.channel.send("happy birthday zannatin");} else {
                message.channel.send(`${member.user.tag} happy birthday`);
            }
}

exports.help = {
    name: "wish"
}