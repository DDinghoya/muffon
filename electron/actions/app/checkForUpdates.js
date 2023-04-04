import {
  app,
  dialog,
  shell
} from 'electron'
import axios from 'axios'
import i18n from 'i18n'

let latestRelease
let latestVersion

function handleNotificationButtonClick (
  {
    response
  }
) {
  if (response === 0) {
    const latestReleaseLink =
      latestRelease.html_url

    shell.openExternal(
      latestReleaseLink
    )
  }
}

function showNotification () {
  const message =
    i18n.__(
      'update.message'
    )

  const downloadText =
    i18n.__(
      'update.buttons.download'
    )

  const closeText =
    i18n.__(
      'update.buttons.close'
    )

  const buttons = [
    downloadText,
    closeText
  ]

  const options = {
    type: 'info',
    message,
    detail: latestVersion,
    buttons,
    defaultId: 0,
    cancelId: 1,
    noLink: true
  }

  dialog.showMessageBox(
    mainWindow,
    options
  ).then(
    handleNotificationButtonClick
  )
}

function handleSuccess (
  response
) {
  latestRelease = response.data
  latestVersion = latestRelease.name

  const currentVersion = app.getVersion()

  const isNewVersionAvailable = (
    latestVersion >
      currentVersion
  )

  if (isNewVersionAvailable) {
    showNotification()
  }
}

function handleError () {
  setTimeout(
    checkForUpdates,
    2000
  )
}

export default function () {
  const releasesUrl =
    'https://api.github.com/repos/staniel359/muffon/releases/latest'

  axios.get(
    releasesUrl
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}
