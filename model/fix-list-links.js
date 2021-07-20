import { join, last, map } from '@dword-design/functions'

import editViewRegex from './edit-view-regex'

export default () => {
  const run = () => {
    const $listLinks = document.querySelectorAll(
      [
        '.top-bar',
        ...(window.location.pathname.startsWith('/listen/meine')
          ? ['.Content']
          : []),
      ]
        |> map(selector => `${selector} a[href^="/listen/bearbeiten/"]`)
        |> join(', ')
    )
    for (const $link of $listLinks) {
      const href = $link.getAttribute('href')

      const match = href.match(editViewRegex)
      $link.setAttribute('href', `/filme-serien/liste-${match |> last}`)
    }
  }

  const observer = new MutationObserver(run)

  const $topBar = document.querySelector('.top-bar')
  observer.observe($topBar, { childList: true })
  run()
}
