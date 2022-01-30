exports.run = async(client,message,args) => {
            let member = message.mentions.members.first();
            if(!member) { message.channel.send("bye");} else {
                message.channel.send(`Bye ${member.user.tag}`);
            }
}

exports.help = {
    name: "bye"
}