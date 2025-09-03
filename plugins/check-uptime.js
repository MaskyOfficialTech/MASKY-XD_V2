const { malvin } = require('../masky');
const { runtime } = require('../lib/functions');
const config = require('../settings');

malvin({
    pattern: "uptime",
    alias: ["runtime", "up"],
    desc: "Show bot uptime with stylish formats",
    category: "main",
    react: "⏱️",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);

        const timeReport = `
╭───⏱️ *ᴜᴘᴛɪᴍᴇ ʀᴇᴘᴏʀᴛ* ⏱️
│
│ 🔋 *Online for:* ${uptime}
│ 🕰️ *Since:* ${startTime.toLocaleString()}
│ 🧩 *Status:* Online & stable
│
╰─➤ ${config.DESCRIPTION || 'Bot Powered By Masky Official Tech.'}
        `.trim();

        await conn.sendMessage(from, { 
            text: timeReport,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420007421078@newsletter',
                    newsletterName: config.OWNER_NAME || 'Masky Tech',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
