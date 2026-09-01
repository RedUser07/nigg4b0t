const defmenu = {
before: "╭━━━〔 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻 〕━━━╮ ┃ 🛠️ 𝑺𝑻𝑹𝑼𝑴𝑬𝑵𝑻𝑰 ╰━━━━━━━━━━━━━━━━━━╯",
header: "\n╭──〔 🛠️ 𝑺𝑻𝑹𝑼𝑴𝑬𝑵𝑻𝑰 〕",
body: "│ 🛠️ %cmd",
footer: "╰━━━━━━━━━━━━━━━━━━╯",
after: "\n> 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻"
}

let handler = async (m, { conn, usedPrefix: _p }) => {
try {
await conn.sendPresenceUpdate('composing', m.chat)

const help = Object.values(global.plugins)
  .filter(plugin =>
    !plugin.disabled &&
    plugin.tags &&
    plugin.tags.includes('strumenti')
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
      defmenu.body.replace(
        '%cmd',
        menu.prefix ? cmd : _p + cmd
      )
    )
  )

const text = [
  defmenu.before,
  defmenu.header,
  commands.join('\n'),
  defmenu.footer,
  defmenu.after
].join('\n')

await conn.sendMessage(
  m.chat,
  {
    text: text.trim(),
    interactiveButtons: [
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '🤖 𝑴𝑬𝑵𝑼 𝑰𝑨',
          id: _p + 'menuia'
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '⭐ 𝑷𝑹𝑬𝑴𝑰𝑼𝑴',
          id: _p + 'menupremium'
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

handler.help = ['menustrumenti']
handler.tags = ['menu']
handler.command = ['menutools', 'menustrumenti']

export default handler