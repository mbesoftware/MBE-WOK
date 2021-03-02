const Mbe = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const {spawnSync} = require('child_process');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('system_stats');

Mbe.addCommand({pattern: 'alive', fromMe: true, desc: Lang.ALIVE_DESC}, (async (message, match) => {
    await message.sendMessage(
        '``` MBE-WOC Yazılımı Aktif!```\n\n*Versiyon:* ```'+Config.VERSION+'```\n*Branch:* ```'+Config.BRANCH+'```\n*Yapımcı:* https://github.com/mbesoftware' , MessageType.text
    );
}));

Mbe.addCommand({pattern: 'sysd', fromMe: true, desc: Lang.SYSD_DESC}, (async (message, match) => {
    const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
    await message.sendMessage(
        '```' + child + '```', MessageType.text
    );
}));
