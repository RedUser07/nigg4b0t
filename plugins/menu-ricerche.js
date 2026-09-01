const defaultMenu = {
before: "╭━━━〔 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻 〕━━━╮ ┃ 🔍 𝑹𝑰𝑪𝑬𝑹𝑪𝑯𝑬 ╰━━━━━━━━━━━━━━━━━━╯",
header: "\n╭──〔 🔍 𝑹𝑰𝑪𝑬𝑹𝑪𝑯𝑬 〕",
body: "│ 🔍 %cmd",
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
    plugin.tags.includes('ricerca')
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
          display_text: '🛠️ 𝑺𝑻𝑹𝑼𝑴𝑬𝑵𝑻𝑰',
          id: _p + 'menustrumenti'
        })
      },
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

handler.help = ['menuricerche']
handler.tags = ['menu']
handler.command = [
'menusearch',
'menuricerche',
'menuricerca'
]

export default handler