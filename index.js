const { app, globalShortcut } = require('electron')
const Bot = require('./bot.js')

app.whenReady().then(async () => {
  bot = new Bot('https://universe.flyff.com/play', 210, 300)
  bot.play()

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
    bot.disableAutoBuff()
  })

  // disable auto buff with random number
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

app.on('will-quit', () => {
  // Unregister a shortcut.
  // globalShortcut.unregister('CommandOrControl+1')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})