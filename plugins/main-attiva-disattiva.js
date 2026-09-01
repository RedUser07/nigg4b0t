const PERM = {
ADMIN: 'admin',
OWNER: 'owner',
sam: 'sam'
}

const featureRegistry = [
{ key: 'welcome', store: 'chat', perm: PERM.ADMIN, aliases: ['benvenuto'], groupOnly: true, name: '👋 Welcome', desc: 'Messaggio di benvenuto' },
{ key: 'goodbye', store: 'chat', perm: PERM.ADMIN, aliases: ['addio'], groupOnly: true, name: '🚪 Addio', desc: 'Messaggio di addio' },
{ key: 'antispam', store: 'chat', perm: PERM.ADMIN, aliases: [], name: '🛑 Antispam', desc: 'Antispam' },
{ key: 'antisondaggi', store: 'chat', perm: PERM.ADMIN, aliases: [], name: '📊🚫 Anti-sondaggi', desc: 'Blocca la creazione di sondaggi' },
{ key: 'antiparolacce', store: 'chat', perm: PERM.ADMIN, aliases: ['antitossici'], name: '🧼 Filtro parolacce', desc: 'Avverte e rimuove per parolacce/insulti' },
{ key: 'antiBot', store: 'chat', perm: PERM.ADMIN, aliases: ['antibot', 'antibots'], name: '🤖❌ Antibot', desc: 'Rimuove eventuali bot indesiderati' },
{ key: 'antiBot2', store: 'chat', perm: PERM.ADMIN, aliases: ['antisubbots', 'antisub'], name: '🤖🚫 Anti-subbots', desc: 'Blocca sub-bot nel gruppo' },
{ key: 'antitrava', store: 'chat', perm: PERM.ADMIN, aliases: [], name: '🧨❌ Antitrava', desc: 'Blocca messaggi troppo lunghi' },
{ key: 'antimedia', store: 'chat', perm: PERM.ADMIN, aliases: [], groupOnly: true, name: '🖼️❌ Antimedia', desc: 'Elimina foto/video' },
{ key: 'antioneview', store: 'chat', perm: PERM.ADMIN, aliases: ['antiviewonce'], groupOnly: true, name: '👁️‍🗨️ Antiviewonce', desc: 'Protezione view once' },
{ key: 'antitagall', store: 'chat', perm: PERM.ADMIN, aliases: ['anti-tagall', 'antimentioni'], groupOnly: true, name: '🏷️🚫 Anti-tagall', desc: 'Blocca menzioni di massa' },
{ key: 'autotrascrizione', store: 'chat', perm: PERM.ADMIN, aliases: ['autotrascrivi', 'autotranscribe', 'autotranscription'], groupOnly: true, name: '📝🎧 Auto-trascrizione', desc: 'Trascrive automaticamente gli audio' },
{ key: 'autotraduzione', store: 'chat', perm: PERM.ADMIN, aliases: ['autotraduci', 'autotranslate'], groupOnly: true, name: '🌍🈯 Auto-traduzione', desc: 'Traduce automaticamente i messaggi' },
{ key: 'rileva', store: 'chat', perm: PERM.ADMIN, aliases: ['detect'], groupOnly: true, name: '📡 Rileva', desc: 'Rileva eventi del gruppo' },
{ key: 'antiporno', store: 'chat', perm: PERM.ADMIN, aliases: ['antiporn', 'antinsfw'], name: '🔞 Antiporno', desc: 'Blocca contenuti pornografici' },
{ key: 'antigore', store: 'chat', perm: PERM.ADMIN, aliases: [], name: '🚫 Antigore', desc: 'Blocca contenuti gore' },
{ key: 'modoadmin', store: 'chat', perm: PERM.ADMIN, aliases: ['soloadmin'], name: '🛡️ Soloadmin', desc: 'Solo gli admin possono usare i comandi' },
{ key: 'ai', store: 'chat', perm: PERM.ADMIN, aliases: ['ia'], groupOnly: true, name: '🧠 IA', desc: 'Intelligenza artificiale' },
{ key: 'vocali', store: 'chat', perm: PERM.ADMIN, aliases: ['siri'], groupOnly: true, name: '🎤 Siri', desc: 'Risponde con audio' },
{ key: 'antivoip', store: 'chat', perm: PERM.ADMIN, aliases: [], name: '📞❌ Antivoip', desc: 'Blocca chiamate VoIP' },
{ key: 'antiLink', store: 'chat', perm: PERM.ADMIN, aliases: ['antilink', 'nolink'], name: '🔗❌ Antilink', desc: 'Blocca link WhatsApp' },
{ key: 'antiLinkUni', store: 'chat', perm: PERM.ADMIN, aliases: ['antilinkuni', 'antilinkuniversale', 'antilinktutto'], name: '🌍🔗❌ Antilink universale', desc: 'Blocca tutti i tipi di link' },
{ key: 'antiLink2', store: 'chat', perm: PERM.ADMIN, aliases: ['antilink2', 'antilinkhard', 'antilinksocial'], name: '🌐❌ Antilinksocial', desc: 'Blocca link social' },
{ key: 'reaction', store: 'chat', perm: PERM.ADMIN, aliases: ['reazioni'], groupOnly: true, name: '😎 Reazioni', desc: 'Reazioni automatiche' },
{ key: 'autolevelup', store: 'chat', perm: PERM.ADMIN, aliases: ['autolivello', 'autolvl'], name: '⬆️ Autolivello', desc: 'Messaggio di livello automatico' },
{ key: 'antiLink2_tiktok', store: 'chat', perm: PERM.ADMIN, aliases: ['antitiktok', 'antitk'], name: '🎵🚫 Anti-TikTok', desc: 'Blocca link TikTok' },
{ key: 'antiLink2_youtube', store: 'chat', perm: PERM.ADMIN, aliases: ['antiyoutube', 'antiyt'], name: '▶️🚫 Anti-YouTube', desc: 'Blocca link YouTube' },
{ key: 'antiLink2_instagram', store: 'chat', perm: PERM.ADMIN, aliases: ['antiinstagram', 'antiig'], name: '📸🚫 Anti-Instagram', desc: 'Blocca link Instagram' },
{ key: 'antiLink2_facebook', store: 'chat', perm: PERM.ADMIN, aliases: ['antifacebook', 'antifb'], name: '👤🚫 Anti-Facebook', desc: 'Blocca link Facebook' },
{ key: 'antiLink2_twitter', store: 'chat', perm: PERM.ADMIN, aliases: ['antitwitter', 'antix'], name: '🐦🚫 Anti-Twitter/X', desc: 'Blocca link Twitter/X' },
{ key: 'antiLink2_telegram', store: 'chat', perm: PERM.ADMIN, aliases: ['antitelegram', 'antitg'], name: '✈️🚫 Anti-Telegram', desc: 'Blocca link Telegram' },
{ key: 'antiLink2_discord', store: 'chat', perm: PERM.ADMIN, aliases: ['antidiscord', 'antidc'], name: '🎮🚫 Anti-Discord', desc: 'Blocca link Discord' },
{ key: 'antiLink2_snapchat', store: 'chat', perm: PERM.ADMIN, aliases: ['antisnapchat', 'antisnap'], name: '👻🚫 Anti-Snapchat', desc: 'Blocca link Snapchat' },
{ key: 'antiLink2_twitch', store: 'chat', perm: PERM.ADMIN, aliases: ['antitwitch'], name: '🟣🚫 Anti-Twitch', desc: 'Blocca link Twitch' },
{ key: 'antiLink2_reddit', store: 'chat', perm: PERM.ADMIN, aliases: ['antireddit'], name: '🔴🚫 Anti-Reddit', desc: 'Blocca link Reddit' },
{ key: 'antiLink2_onlyfans', store: 'chat', perm: PERM.ADMIN, aliases: ['antionlyfans', 'antiof'], name: '🔞🚫 Anti-OnlyFans', desc: 'Blocca link OnlyFans' },
{ key: 'antiLink2_linkedin', store: 'chat', perm: PERM.ADMIN, aliases: ['antilinkedin'], name: '💼🚫 Anti-LinkedIn', desc: 'Blocca link LinkedIn' },
{ key: 'antiLink2_github', store: 'chat', perm: PERM.ADMIN, aliases: ['antigithub'], name: '🐙🚫 Anti-GitHub', desc: 'Blocca link GitHub' },
{ key: 'antiprivato', store: 'bot', perm: PERM.OWNER, aliases: ['antipriv'], name: '🔒 Blocco privato', desc: 'Blocca chi scrive in privato al bot' },
{ key: 'soloe', store: 'bot', perm: PERM.sam, aliases: ['solocreatore', 'solowner', 'soloowner'], name: '👑 Solocreatore', desc: 'Solo il creatore può usare i comandi' },
{ key: 'multiprefix', store: 'bot', perm: PERM.OWNER, aliases: ['multiprefisso', 'multipref'], onToggle: 'multiprefix', name: '🔣 Multiprefix', desc: 'Permette più prefissi' },
{ key: 'jadibotmd', store: 'bot', perm: PERM.OWNER, aliases: ['subbots'], name: '🧬 Subbots', desc: 'Bot multi-sessione' },
{ key: 'antispambot', store: 'bot', perm: PERM.OWNER, aliases: [], name: '🤖🛑 Anti-spam comandi', desc: 'Limita lo spam dei comandi' },
{ key: 'autoread', store: 'bot', perm: PERM.OWNER, aliases: ['read', 'lettura'], name: '👀 Lettura', desc: 'Lettura automatica dei messaggi' },
{ key: 'anticall', store: 'bot', perm: PERM.sam, aliases: [], name: '❌📞 Antichiamate', desc: 'Rifiuta automaticamente le chiamate' },
{ key: 'registrazioni', store: 'bot', perm: PERM.OWNER, aliases: ['registrazione', 'reg'], name: '📛 Obbligo registrazione', desc: 'Richiede la registrazione' }
]

const aliasMap = new Map()

for (const feat of featureRegistry) {
aliasMap.set(feat.key.toLowerCase(), feat)

for (const alias of feat.aliases) {
aliasMap.set(alias.toLowerCase(), feat)
}
}

const adminkeyz = new Set([
'welcome',
'goodbye',
'antispam',
'antisondaggi',
'antiparolacce',
'antiBot',
'antiBot2',
'antitrava',
'antimedia',
'antioneview',
'antitagall',
'autotrascrizione',
'autotraduzione',
'rileva',
'antiporno',
'antigore',
'modoadmin',
'ai',
'vocali',
'antivoip',
'antiLink',
'antiLinkUni',
'antiLink2',
'reaction',
'autolevelup',
'antiLink2_tiktok',
'antiLink2_youtube',
'antiLink2_instagram',
'antiLink2_facebook',
'antiLink2_twitter',
'antiLink2_telegram',
'antiLink2_discord',
'antiLink2_snapchat',
'antiLink2_twitch',
'antiLink2_reddit',
'antiLink2_onlyfans',
'antiLink2_linkedin',
'antiLink2_github'
])

const ownerkeyz = new Set([
'antiprivato',
'soloe',
'multiprefix',
'jadibotmd',
'antispambot',
'autoread',
'anticall',
'registrazioni'
])

const adminz = featureRegistry.filter(f => adminkeyz.has(f.key))
const ownerz = featureRegistry.filter(f => ownerkeyz.has(f.key))

function checkPermission(feat, { m, isAdmin, isOwner, isSam }) {
if (feat.groupOnly && !m.isGroup && !isOwner && !isSam) {
return '『 ❌ 』 Comando valido solo nei gruppi'
}

switch (feat.perm) {
case PERM.sam:
if (!isSam) return '『 ❌ 』 Richiede privilegi di proprietario'
break

case PERM.OWNER:
  if (feat.store === 'bot' && !isOwner && !isSam) {
    return '『 ❌ 』 Richiede privilegi di proprietario'
  }

  if (feat.store === 'chat' && m.isGroup && !(isAdmin || isOwner || isSam)) {
    return '『 ❌ 』 Solo gli admin del gruppo possono usare questo comando'
  }
  break

case PERM.ADMIN:
  if (m.isGroup && !(isAdmin || isOwner || isSam)) {
    return '『 ❌ 』 Solo gli admin del gruppo possono usare questo comando'
  }
  break

}

return null
}

function handleMultiprefixToggle(bot) {
try {
const defaultSinglePrefix =
typeof global.prefisso === 'string' && global.prefisso.trim()
? global.prefisso.trim()
: '.'

const raw =
  typeof bot.prefix === 'string'
    ? bot.prefix.trim()
    : ''

const p =
  bot.multiprefix === true && (!raw || raw.length <= 1)
    ? (raw || global.opts.prefix)
    : (raw || defaultSinglePrefix)

if (bot.multiprefix === true) {
  global.prefix = new RegExp(
    '^[' +
    String(p).replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') +
    ']'
  )
} else {
  const c = String(p)[0] || '.'

  global.prefix = new RegExp(
    '^' +
    String(c).replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&')
  )
}

} catch {}
}

let handler = async (
m,
{
conn,
usedPrefix,
command,
args,
isOwner,
isAdmin,
isSam
}
) => {
try {
let isEnable = /true|enable|attiva|(turn)?on|1/i.test(command)

if (/disable|disattiva|off|0/i.test(command)) {
  isEnable = false
}

global.db.data.chats = global.db.data.chats || {}
global.db.data.settings = global.db.data.settings || {}

global.db.data.chats[m.chat] =
  global.db.data.chats[m.chat] || {}

const botJid = conn.decodeJid(conn.user.jid)

global.db.data.settings[botJid] =
  global.db.data.settings[botJid] || {}

const chat = global.db.data.chats[m.chat]
const bot = global.db.data.settings[botJid]

const getStatus = key => {
  const feat = aliasMap.get(key.toLowerCase())

  if (!feat) return false

  const target =
    feat.store === 'bot'
      ? bot
      : chat

  return target[feat.key] || false
}

const createSections = features => {
  const active = features.filter(f => getStatus(f.key))
  const inactive = features.filter(f => !getStatus(f.key))

  return [
    {
      title: '❌ DISATTIVATI',
      rows: inactive.map(f => ({
        title: f.name,
        description: f.desc,
        id: `${usedPrefix}attiva ${f.key}`
      }))
    },
    {
      title: '✅ ATTIVATI',
      rows: active.map(f => ({
        title: f.name,
        description: f.desc,
        id: `${usedPrefix}disattiva ${f.key}`
      }))
    }
  ]
}

if (!args.length) {
  const adminSections = createSections(adminz)
  const ownerSections = createSections(ownerz)

  const buttons = [
    {
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: '⚙️ Impostazioni Admin',
        sections: adminSections
      })
    }
  ]

  if (isOwner || isSam) {
    buttons.push({
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: '👑 Impostazioni Owner',
        sections: ownerSections
      })
    })
  }

  return await conn.sendMessage(
    m.chat,
    {
      text: `╭━━━〔 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻 〕━━━╮

┃ ⚙️ 𝑰𝑴𝑷𝑶𝑺𝑻𝑨𝒁𝑰𝑶𝑵𝑰
╰━━━━━━━━━━━━━━━━━━╯

👥 𝑨𝑫𝑴𝑰𝑵
Gestisci le funzioni del gruppo.

👑 𝑶𝑾𝑵𝑬𝑹
Gestisci le funzioni del bot.

╰━━━━━━━━━━━━━━━━━━╯`,
footer: '𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻',
interactiveButtons: buttons
},
{ quoted: m }
)
}

const results = []

for (const type of args.map(arg => arg.toLowerCase())) {
  const result = {
    type,
    status: '',
    success: false
  }

  const feat = aliasMap.get(type)

  if (!feat) {
    result.status = '『 ❌ 』 Comando non riconosciuto'
    results.push(result)
    continue
  }

  const permError = checkPermission(feat, {
    m,
    isAdmin,
    isOwner,
    isSam
  })

  if (permError) {
    result.status = permError
    results.push(result)
    continue
  }

  const target =
    feat.store === 'bot'
      ? bot
      : chat

  if (target[feat.key] === isEnable) {
    result.status =
      `『 ⚠️ 』 Già ${isEnable ? 'attivo' : 'disattivato'}`

    results.push(result)
    continue
  }

  target[feat.key] = isEnable

  if (feat.onToggle === 'multiprefix') {
    handleMultiprefixToggle(bot)
  }

  result.status =
    `『 ✅ 』 ${isEnable ? 'Attivato' : 'Disattivato'}`

  result.success = true

  results.push(result)
}

let summaryMessage = `╭━━━〔 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻 〕━━━╮

┃ ⚙️ 𝑴𝑶𝑫𝑰𝑭𝑰𝑪𝑯𝑬
╰━━━━━━━━━━━━━━━━━━╯\n\n`

for (const result of results) {
  summaryMessage +=
    `• ${result.type}: ${result.status}\n`
}

summaryMessage +=
  `\n╰━━━━━━━━━━━━━━━━━━╯`

await conn.sendMessage(
  m.chat,
  {
    text: summaryMessage
  },
  { quoted: m }
)

} catch (e) {
console.error(e)
await conn.reply(
m.chat,
"${global.errore}",
m
)
}
}

handler.help = ['attiva', 'disattiva']
handler.tags = ['main']
handler.command = [
'enable',
'disable',
'attiva',
'disattiva',
'on',
'off'
]

export default handler