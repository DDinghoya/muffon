import i18n from '*/plugins/i18n'
import {
  main as formatArtistMainLink,
  albums as formatArtistAlbumsLink
} from '*/helpers/formatters/links/artist'
import { main as formatAlbumMainLink } from '*/helpers/formatters/links/album'

export default function ({
  artistName,
  albumTitle,
  sourceParams,
  pageNameKey
}) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatAlbumMainLink({
        artistName,
        albumTitle,
        sourceParams
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `navigation.model.${pageNameKey}`,
          { modelName: albumTitle }
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.artists'
      )
    },
    {
      name: artistName,
      link: formatArtistMainLink({
        artistName
      })
    },
    {
      name: i18n.global.t(
        'navigation.albums'
      ),
      link: formatArtistAlbumsLink({
        artistName
      })
    },
    {
      name: albumTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
