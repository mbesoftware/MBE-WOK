const Mbe = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

const fs = require('fs');
const Language = require('../language');
const Lang = Language.getString('profile');

Mbe.addCommand({pattern: 'kickme', fromMe: true, desc: Lang.KICKME_DESC, onlyGroup: true}, (async (message, match) => {    
    await message.client.sendMessage(message.jid,Lang.KICKME,MessageType.text);
    await message.client.groupLeave(message.jid);
}));

Mbe.addCommand({pattern: 'pp', fromMe: true, desc: Lang.PP_DESC}, (async (message, match) => {    
    if (message.reply_message === false || message.reply_message.image === false) return await message.client.sendMessage(message.jid,Lang.NEED_PHOTO);
    
    var load = await message.client.sendMessage(message.jid,Lang.PPING,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    await message.client.updateProfilePicture(message.client.user.jid, fs.readFileSync(location));
    await load.delete();
}));

Mbe.addCommand({pattern: 'block ?(.*)', fromMe: true, desc: Lang.BLOCK_DESC}, (async (message, match) => {    
    if (message.reply_message !== false) {
        await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + '```, ' + Lang.BLOCKED + '!```', MessageType.text, {
            quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
        });
        await message.client.blockUser(message.reply_message.jid, "add");
    } else if (message.mention !== false) {
        message.mention.map(async user => {
            await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + '```, ' + Lang.BLOCKED + '!```', MessageType.text, {
                previewType: 0, contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
            });
            await message.client.blockUser(user, "add");
        });
    } else if (!message.jid.includes('-')) {
        await message.client.sendMessage(message.jid, '*' + Lang.BLOCKED_UPPER + '*', MessageType.text);
        await message.client.blockUser(message.jid, "add");
    } else {
        await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text);
    }
}));

Mbe.addCommand({pattern: 'unblock ?(.*)', fromMe: true, desc: Lang.UNBLOCK_DESC}, (async (message, match) => {    
    if (message.reply_message !== false) {
        await message.client.blockUser(message.reply_message.jid, "remove");
        await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + '```, ' + Lang.UNBLOCKED + '!```', MessageType.text, {
            quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
        });
    } else if (message.mention !== false) {
        message.mention.map(async user => {
            await message.client.blockUser(user, "remove");
            await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + '```, ' + Lang.UNBLOCKED + '!```', MessageType.text, {
                contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
            });    
        });
    } else if (!message.jid.includes('-')) {
        await message.client.blockUser(message.jid, "remove");
        await message.client.sendMessage(message.jid, '*' + Lang.UNBLOCKED_UPPER + '*', MessageType.text,);
    } else {
        await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text,);
    }
}));

Mbe.addCommand({pattern: 'jid ?(.*)', fromMe: true, desc: Lang.JID_DESC}, (async (message, match) => {    
    if (message.reply_message !== false) {
        await message.client.sendMessage(message.jid, Lang.JID.format(message.reply_message.jid.split('@')[0], message.reply_message.jid), MessageType.text, {
            quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
        });
    } else if (message.mention !== false) {
        message.mention.map(async user => {
            await message.client.sendMessage(message.jid, Lang.JID.format(user.split('@')[0], user), MessageType.text, {
                contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
            });    
        });
    } else {
        await message.client.sendMessage(message.jid, Lang.JID_CHAT.format(message.jid), MessageType.text);
    }
}));