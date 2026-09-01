const emojicategoria = {
iatesto: '📝',
iaaudio: '🎧',
iaimmagini: '🖼️'
}

const tags = {
iatesto: '𝑰𝑨 𝑻𝑬𝑺𝑻𝑶',
iaaudio: '𝑰𝑨 𝑨𝑼𝑫𝑰𝑶',
iaimmagini: '𝑰𝑨 𝑰𝑴𝑴𝑨𝑮𝑰𝑵𝑰'
}

const defaultMenu = {
before: "╭━━━〔 𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻 〕━━━╮ ┃ 🤖 𝑰𝑵𝑻𝑬𝑳𝑳𝑰𝑮𝑬𝑵𝒁𝑨 𝑨𝑹𝑻𝑰𝑭𝑰𝑪𝑰𝑨𝑳𝑬 ╰━━━━━━━━━━━━━━━━━━╯",
header: "\n╭──〔 %category 〕",
body: "│ %emoji %cmd",
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
    ['iatesto', 'iaaudio', 'iaimmagini'].some(tag =>
      plugin.tags.includes(tag)
    )
  )
  .map(plugin => ({
    help: Array.isArray(plugin.help)
      ? plugin.help
      : [plugin.help],
    tags: Array.isArray(plugin.tags)
      ? plugin.tags
      : [plugin.tags],
    prefix: 'customPrefix' in plugin
  }))

const categories = Object.keys(tags).map(tag => {
  const commands = help
    .filter(menu =>
      menu.tags.includes(tag) &&
      menu.help
    )
    .flatMap(menu =>
      menu.help.map(cmd =>
        defaultMenu.body
          .replace(
            '%cmd',
            menu.prefix ? cmd : _p + cmd
          )
          .replace(
            '%emoji',
            emojicategoria[tag]
          )
      )
    )

  if (!commands.length) return ''

  return [
    defaultMenu.header.replace('%category', tags[tag]),
    commands.join('\n'),
    defaultMenu.footer
  ].join('\n')
})

const text = [
  defaultMenu.before,
  ...categories,
  defaultMenu.after
]
  .join('\n')
  .trim()

await conn.sendMessage(
  m.chat,
  {
    text: text,
    interactiveButtons: [
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
          display_text: '🛠️ 𝑺𝑻𝑹𝑼𝑴𝑬𝑵𝑻𝑰',
          id: _p + 'menustrumenti'
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

handler.help = ['menuia']
handler.tags = ['menu']
handler.command = ['menuia', 'menuai']

export default handler