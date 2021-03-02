const Mbe = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const axios = require('axios');

const got = require("got"); // Responses Catcher
const deepai = require('deepai'); // Localde ise deepmain.js oluşturarak özelleştirilebilir şekilde kullanabilirsiniz. Web Sunucularında Çalışmaz!!
deepai.setApiKey('4ec4c7f4-63cd-457f-b244-7e12bba7ebde'); // Quickstart API Key

const Language = require('../language'); 
const Lang = Language.getString('deepai'); // Language Support

Mbe.addCommand({pattern: 'deepai', fromMe: true, deleteCommand: false, desc: Lang.DEEPAI_DESC}, (async (message, match) => {

    await message.sendMessage('💻 Kullanımı: *.moodai <text>*\nℹ️ Desc: 🇹🇷 Yazdığınız yazıdan ruh halinizi bulur.\n🇬🇧 It finds your mood from the article you wrote.\n\n💻 Kullanım: *.colorai*\nℹ️ Desc: 🇹🇷 Siyah beyaz fotoğrafları renklendirir.\n🇬🇧 It colorize bw photos.\n\n💻 Kullanım: *.superai*\nℹ️ Desc: 🇹🇷 Fotoğrafın kalitesini yapay zeka ile arttırır.\n🇬🇧 Improves the quality of photos with Neural AI.\n\n💻 Kullanım: *.waifuai*\nℹ️ Desc: 🇹🇷 Fotoğrafların renk paletlerini yapay zeka ile birleştirir.\n🇬🇧 Combines the color palettes of photos with artificial intelligence.\n\n💻 Kullanım: *.dreamai*\nℹ️ Desc: 🇹🇷 Fotoğrafa deepdream efekti uygular.\n🇬🇧 Applies deepdream effect to the photo.\n\n💻 Kullanım: *.neuraltalkai*\nℹ️ Desc: 🇹🇷 Fotoğrafki olan şeyi yapay zeka ile açıklar.\n🇬🇧 Explain the phenomenon in the photo with artificial intelligence.\n\n💻 Kullanım: *.ttiai <text>*\nℹ️ Desc: 🇹🇷 Yazıyı resme dönüştürür.\n🇬🇧 Converts text to a picture. (Text-to-Image)\n\n💻 Kullanım: *.toonai*\nℹ️ Desc: 🇹🇷 Fotoğraftaki yüzü çizgi film karakterine çevirir.\n🇬🇧 Turns the face in the photo into a cartoon character.\n\n💻 Kullanım: *.textai <text>*\nℹ️ Desc: 🇹🇷 Yazdığınız cümleden size yapay bir hikaye yaratır.\n🇬🇧 It creates an artificial story for you from your sentence.\n\n💻 Kullanım: *.nudityai*\nℹ️ Desc: 🇹🇷 Fotoğraftaki NSFW değerini 1 ve 0 arasında gösterir. \n🇬🇧 It shows the NSFW value between 1 and 0 in the photo.\n\n⚠️ 🇹🇷 *Bütün bu yapay zeka araçlarını derin öğrenme ile çalışır. Ne kadar fazla kullanırsanız o kadar fazla bilgiyi depolar.* ```Sadece ingilizce karakter kullanın!```\n\n⚠️ 🇬🇧 *All the tools here work with deep learning. The more you use it, the more information it stores.* ```Use only english characters!```');

}));

Mbe.addCommand({pattern: 'colorai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Fotoğraf Ekleyin!```');

    var downloading = await message.client.sendMessage(message.jid,'Renklendiriliyor.. 🎨',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("colorizer", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE-WOK Yazılımı Tarafından Üretildi'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'waifuai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Fotoğraf Ekleyin!```');

    var downloading = await message.client.sendMessage(message.jid,'İşleniyor.. 🧩',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("waifu2x", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE-WOK Yazılımı Tarafından Üretildi'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'superai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Fotoğraf Ekleyin!```');

    var downloading = await message.client.sendMessage(message.jid,'İşleniyor.. 🖌️',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("torch-srgan", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE-WOK Yazılımı Tarafından Üretildi'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'moodai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("sentiment-analysis", {
        text: `${match[1]}`,

    });

    await message.reply(`*Mood:* ${resp.output}`);

}));

Asena.addCommand({pattern: 'dreamai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Fotoğraf Ekleyin!```');

    var downloading = await message.client.sendMessage(message.jid,'İşleniyor.. 🌃',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("deepdream", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE-WOK Yazılımı Tarafından Üretildi'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'neuraltalkai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Fotoğraf Ekleyin!```');

    var downloading = await message.client.sendMessage(message.jid,'İşleniyor.. 🙇🏻',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("neuraltalk", {
                image: fs.createReadStream("./output.jpg"),

            });

            await message.reply(`*Output:* ${resp.output}`);

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'ttiai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("text2img", {
        text: `${match[1]}`,

    });

    var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'MBE-WOK Yazılımı Tarafından Üretildi'})

}));

Asena.addCommand({pattern: 'toonai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Fotoğraf Ekleyin!```');

    var downloading = await message.client.sendMessage(message.jid,'İşleniyor.. 🌟',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("toonify", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'nudityai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Fotoğraf Ekleyin!```');

    var downloading = await message.client.sendMessage(message.jid,'İşleniyor... ',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("content-moderation", {
                image: fs.createReadStream("./output.jpg"),

            });

            await message.reply(`*Output:* ${resp.output.nsfw_score}`);

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'textai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("text-generator", {
        text: `${match[1]}`,

    });

    await message.reply(`*Article:*\n ${resp.output}`);

}));
