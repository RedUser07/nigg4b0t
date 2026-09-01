const handler = async (m, { conn, args, usedPrefix, command }) => {
if (args.length < 2) {
await conn.reply(m.chat, 'Uso: ' + usedPrefix + command + ' <link_gruppo> <numero_segnalazioni>', m);
return;
}

const inviteLink = args[0];
const reportCount = parseInt(args[1]);

if (isNaN(reportCount) || reportCount < 1 || reportCount > 1000) {
await conn.reply(m.chat, 'Numero segnalazioni deve essere compreso tra 1 e 1000.', m);
return;
}

const inviteCode = inviteLink.includes('chat.whatsapp.com/')
? inviteLink.split('chat.whatsapp.com/')[1].replace(/[^a-zA-Z0-9]/g, '')
: inviteLink;

if (!inviteCode) {
await conn.reply(m.chat, 'Link invito non valido.', m);
return;
}

try {
const groupInfo = await conn.groupGetInviteInfo(inviteCode);
if (!groupInfo) {
await conn.reply(m.chat, 'Impossibile ottenere info dal link. Verifica che il bot sia nel gruppo.', m);
return;
}

const groupId = groupInfo.id;
const groupMetadata = await conn.groupMetadata(groupId);
const botJid = conn.user.jid;
const isBotMember = groupMetadata.participants.some(p => p.id === botJid);

if (!isBotMember) {
await conn.reply(m.chat, 'Il bot non e membro del gruppo ' + groupId + '. Uniscilo prima.', m);
return;
}

await conn.reply(m.chat, 'Avvio mass report su gruppo: ' + groupId + ' - ' + reportCount + ' segnalazioni.', m);

for (let i = 0; i < reportCount; i++) {
try {
await conn.sendMessage(groupId, {
text: 'SEGNALAZIONE #' + (i + 1) + ' per violazione delle linee guida.'
});
await new Promise(resolve => setTimeout(resolve, 500));
} catch (e) {
console.error('Errore segnalazione #' + (i + 1) + ':', e);
}
}

await conn.reply(m.chat, 'Mass report completato: ' + reportCount + ' segnalazioni inviate a ' + groupId + '.', m);

} catch (error) {
console.error(error);
await conn.reply(m.chat, 'Errore durante il mass report: ' + error.message, m);
}
};

handler.help = ['massreport <link> <n>'];
handler.tags = ['admin'];
handler.command = ['massreport'];
handler.admin = true;
handler.group = false;

export default handler;

