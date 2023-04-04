import clear from './clear.js'

export default function (
  tabId
) {
  clear(
    tabId
  )

  mainWindow
    .webContents
    .send(
      'delete-tab',
      tabId
    )
}
