const chalk = require('chalk');
const {WAConnection} = require('@adiwajshing/baileys');
const {StringSession} = require('./mbewhatsapp/');
const fs = require('fs');

async function mbeWhatsapp () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 30000;
    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Mbe')}${chalk.blue.bold('Whatsapp')}
${chalk.white.italic('MBE-WOK String Kod Alıcı')}

${chalk.blue.italic('ℹ️  Whatsapp a Bağlanılıyor...')}`);
    });
    

    conn.on('open', () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold('MBE-WOK String Kodunuz: '), Session.createStringSession(conn.base64EncodedAuthInfo())
        );
        
        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `MBE_SESSION="${st}"`);
        }

        console.log(
            chalk.blue.bold('Locale kuruyorsanız node bot.js ile botu başlatabilirsiniz.')
        );
        process.exit(0);
    });

    await conn.connect();
}

mbeWhatsapp()