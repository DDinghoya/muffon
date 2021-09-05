import { profiles as formatProfilesLink } from '#/formatters/links'
import { main as formatProfileMainLink } from '#/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'
import { localize } from '#/actions/plugins/i18n'

export default function ({ profileId, profileNickname, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatProfileLibraryMainLink({
        profileId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: localize(
          `layout.navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: localize(
        'layout.navigation.profiles'
      ),
      link: formatProfilesLink()
    },
    {
      name: profileNickname,
      link: formatProfileMainLink({
        profileId
      })
    },
    {
      name: localize(
        'layout.navigation.library'
      ),
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
