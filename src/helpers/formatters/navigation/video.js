import i18n from '*/plugins/i18n'
import {
  videos as formatVideoChannelVideosLink
} from '*/helpers/formatters/links/videoChannel'
import { main as formatVideoMainLink } from '*/helpers/formatters/links/video'

export default function ({
  videoId,
  videoTitle,
  channelId,
  channelTitle,
  pageNameKey
}) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatVideoMainLink({
        videoId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.videoChannels'
      )
    },
    { name: channelTitle },
    {
      name: i18n.global.t(
        'navigation.videos'
      ),
      link: formatVideoChannelVideosLink({
        channelId
      })
    },
    {
      name: videoTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
