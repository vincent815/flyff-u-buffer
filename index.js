const path = require('path')
const { app, globalShortcut } = require('electron')
const Bot = require('./bot.js')

let bot

app.whenReady().then(async () => {
  const sessionPath = path.join(app.getPath('userData'), 'browser-session')
  bot = new Bot('https://universe.flyff.com/play', 210, 300, sessionPath)
  await bot.play()

  // heal
  globalShortcut.register('Ctrl+Shift+1', () => {
    bot.heal()
    console.log('Healing....')
  })

  globalShortcut.register('Ctrl+Shift+2', () => {
    bot.fly()
    console.log('Flying...')
  })

  // buff
  globalShortcut.register('Insert', () => {
    bot.buff()
    console.log('Buffing...')
  })

  // enable auto buff with random number
  globalShortcut.register('Home', () => {
    console.log('Auto buff enabled... ')
    bot.enableAutoBuff()
  })

  // disable auto buff with random number
  globalShortcut.register('End', () => {
    bot.disableAutoBuffAndHeal()
  })


  globalShortcut.register('Delete', () => {
    bot.spamHeal()
  })

  // Check whether a shortcut is registered.
  if (globalShortcut.isRegistered('Ctrl+Shift+1')) {
    console.log('Heal regitered')
  }

  if (globalShortcut.isRegistered('Ctrl+Shift+3')) {
    console.log('Heal registered')
  }

  if (globalShortcut.isRegistered('Home')) {
    console.log('Auto buff registered')
  }

  if (globalShortcut.isRegistered('End')) {
    console.log('Disable auto buff registered')
  }
})

app.on('will-quit', async () => {
  // Unregister a shortcut.
  // globalShortcut.unregister('CommandOrControl+1')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()

  if (bot) {
    await bot.close()
  }
})
