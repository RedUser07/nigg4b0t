const defaultMenu = {
before: "╭━━━〔 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻 〕━━━╮ ┃ 🪙 𝑴𝑬𝑵𝑼 𝑬𝑼𝑹𝑶 ╰━━━━━━━━━━━━━━━━━━╯",
header: "\n╭──〔 🪙 𝑬𝑼𝑹𝑶 〕",
body: "│ 🪙 %cmd",
footer: "╰━━━━━━━━━━━━━━━━━━╯",
after: "\n> 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻"
}

const handler = async (m, { conn, usedPrefix: _p }) => {
try {
await conn.sendPresenceUpdate('composing', m.chat)

const help = Object.values(global.plugins)
  .filter(plugin =>
    !plugin.disabled &&
    plugin.tags &&
    plugin.tags.includes('euro')
  )
  .map(plugin => ({
    help: Array.isArray(plugin.help)
      ? plugin.help
      : [plugin.help],
    prefix: 'customPrefix' in plugin
  }))

const commands = help
  .flatMap(menu =>
    menu.help.map(cmd =>
      defaultMenu.body.replace(
        '%cmd',
        menu.prefix ? cmd : _p + cmd
      )
    )
  )

const text = [
  defaultMenu.before,
  defaultMenu.header,
  commands.join('\n'),
  defaultMenu.footer,
  defaultMenu.after
].join('\n')

await conn.sendMessage(
  m.chat,
  {
    text: text.trim(),
    interactiveButtons: [
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '🎮 𝑴𝑬𝑵𝑼 𝑮𝑰𝑶𝑪𝑯𝑰',
          id: _p + 'menugiochi'
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '👥 𝑴𝑬𝑵𝑼 𝑮𝑹𝑼𝑷𝑷𝑶',
          id: _p + 'menugruppo'
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '🏠 𝑴𝑬𝑵𝑼',
          id: _p + 'menu'
        })
      }
    ]
  },
  { quoted: m }
)

} catch (e) {
console.error(e)
await conn.reply(m.chat, "${global.errore}", m)
}
}

handler.help = ['menueuro']
handler.tags = ['menu']
handler.command = ['menueuro']

export default handler