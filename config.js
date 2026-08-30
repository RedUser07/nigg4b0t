import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import chalk from 'chalk'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import NodeCache from 'node-cache'

const pkg =
  JSON.parse(
    fs.readFileSync(
      './package.json',
      'utf-8'
    )
  )

const moduleCache =
  new NodeCache({
    stdTTL: 300
  })

global.owner = [
  ['639559607988', '𝕯𝖊ⱥ𝖉𝖑𝐲', true],
  ['393520981708', 'young', true],
  ['393762883794', 'red', true],
]

global.mods = [
  'xxxxxxxxxx',
  'xxxxxxxxxx'
]

global.prems = [
  'xxxxxxxxxx',
  'xxxxxxxxxx'
]

global.nomebot  = '𝑵𝑰𝑮𝑮𝑨 𝑩𝑶𝑻'
global.nomepack = '𝑵𝑰𝑮𝑮𝑨 𝑩𝑶𝑻'

global.wm       = '𝑵𝑰𝑮𝑮𝑨 𝑩𝑶𝑻'

global.autore   = '𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻'
global.dev      = '𝑵𝑰𝑮𝑮𝑨-𝑩𝑶𝑻'

global.versione = pkg.version

global.testobot =
  `NIGGA-CORE-V${pkg.version}`

global.errore =
  '⚠️ *[SYSTEM ERROR]* Usa `.segnala` per inviare il log allo staff.'

global.cheerio = cheerio
global.fs      = fs
global.fetch   = fetch
global.axios   = axios
global.moment  = moment

global.APIKeys = {
  spotifyclientid: 'nigga',
  spotifysecret: 'nigga',
  browserless: 'nigga',
  screenshotone: 'nigga',
  tmdb: 'nigga',
  gemini: 'nigga',
  ocrspace: 'nigga',
  assemblyai: 'nigga',
  google: 'nigga',
  googlex: 'nigga',
  googleCX: 'nigga',
  genius: 'nigga',
  unsplash: 'nigga',
  removebg: 'FEx4CYmYN1QRQWD1mbZp87jV',
  openrouter: 'nigga',
  lastfm: '36f859a1fc4121e7f0e931806507d5f9',
  sightengine_user: '1244671441',
  sightengine_secret: 'uvqy7fWkiqLbrs4YbdDTnn3a3ZvuEhjM',
}

let filePath =
  fileURLToPath(import.meta.url)

let fileUrl =
  pathToFileURL(filePath).href

const reloadConfig = async () => {

  const cached =
    moduleCache.get(fileUrl)

  if (cached)
    return cached

  unwatchFile(filePath)

  console.log(
    chalk.bgCyan.black(' SYSTEM ') +
    chalk.cyan(
      ` File 'config.js' aggiornato con successo.`
    )
  )

  const module =
    await import(
      `${fileUrl}?update=${Date.now()}`
    )

  moduleCache.set(
    fileUrl,
    module,
    { ttl: 300 }
  )

  return module
}

watchFile(
  filePath,
  reloadConfig
)