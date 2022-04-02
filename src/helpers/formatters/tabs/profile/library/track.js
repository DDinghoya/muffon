import i18n from '*/plugins/i18n'
import {
  main as formatProfileLibraryTrackMainLink
} from '*/helpers/formatters/links/profile/library/track'

export default function ({
  profileId,
  profileNickname,
  artistName,
  trackId,
  trackTitle,
  pageNameKey
}) {
  const formatProfileLibraryTrackPageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `navigation.model.${pageNameKey}`,
        { modelName: trackTitle }
      )
    } else {
      return trackTitle
    }
  }

  const profileLibraryArtistPageTitle = i18n.global.t(
    'navigation.model.tracks',
    { modelName: artistName }
  )

  const profileLibraryPageTitle = i18n.global.t(
    'navigation.model.artists',
    { modelName: profileNickname }
  )

  const title = [
    formatProfileLibraryTrackPageTitle(),
    profileLibraryArtistPageTitle,
    profileLibraryPageTitle
  ].join(' | ')

  const formatPath = () => {
    switch (pageNameKey) {
      default:
        return formatProfileLibraryTrackMainLink({
          profileId,
          trackId
        }).path
    }
  }

  return {
    icon: 'music',
    title,
    path: formatPath()
  }
}
