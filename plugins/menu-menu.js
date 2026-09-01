const emojicategoria = {
main: '🦋',
info: '⁉️'
}

const tags = {
main: '𝑴𝑨𝑰𝑵',
info: '𝑰𝑵𝑭𝑶'
}

const defaultMenu = {
before: `╭━━━〔 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻 〕━━━╮
┃ 👤 𝑼𝒕𝒆𝒏𝒕𝒆: %name
┃ ⚡ 𝑼𝒑𝒕𝒊𝒎𝒆: %uptime
┃ 👥 𝑼𝒕𝒆𝒏𝒕𝒊: %totalreg
╰━━━━━━━━━━━━━━━━━━╯

", header: "╭──〔 %category 〕", body: "│ %emoji %cmd", footer: "╰━━━━━━━━━━━━━━━━━━╯
", after: "\n> 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻 • 𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀 𝑵𝑰𝑮𝑮𝑮𝑨`
}

let handler = async (m, { conn, usedPrefix: _p }) => {
try {
await conn.sendPresenceUpdate('composing', m.chat)

const name = await conn.getName(m.sender) || 'Utente'
const uptime = clockString(process.uptime() * 1000)
const totalreg = Object.keys(global.db.data.users).length

const help = Object.values(global.plugins)
  .filter(plugin => !plugin.disabled)
  .map(plugin => ({
    help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
    tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
    prefix: 'customPrefix' in plugin
  }))

const text = [
  defaultMenu.before,
  ...Object.keys(tags).map(tag => {
    const commands = help
      .filter(plugin => plugin.tags?.includes(tag) && plugin.help?.length)
      .flatMap(plugin =>
        plugin.help.map(command =>
          defaultMenu.body
            .replace('%cmd', plugin.prefix ? command : '%p' + command)
            .replace('%emoji', emojicategoria[tag] || '•')
        )
      )

    if (!commands.length) return ''

    return [
      defaultMenu.header.replace('%category', tags[tag]),
      ...commands,
      defaultMenu.footer
    ].join('\n')
  }),
  defaultMenu.after
]
  .join('\n')
  .replace(/%p/g, _p)
  .replace(/%name/g, name)
  .replace(/%uptime/g, uptime)
  .replace(/%totalreg/g, totalreg)
  .trim()

await conn.sendMessage(
  m.chat,
  {
    text: text
  },
  { quoted: m }
)

} catch (e) {
console.error(e)
await conn.reply(m.chat, "${global.errore}", m)
}
}

handler.help = ['menu']
handler.command = [
'menu',
'menuall',
'menucompleto',
'funzioni',
'comandi',
'help'
]

export default handler

function clockString(ms) {
const h = Math.floor(ms / 3600000)
const m = Math.floor(ms / 60000) % 60
const s = Math.floor(ms / 1000) % 60

return [h, m, s]
.map(v => v.toString().padStart(2, '0'))
.join(':')
}