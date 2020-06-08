import { endent, last } from '@dword-design/functions'
import { SLUG } from './variables.config'
import frontViewRegex from './front-view-regex'

export default () => {
  const match = window.location.pathname.match(frontViewRegex)
  if (match) {
    const $heading = document.querySelector('h1')

    let $edit = document.querySelector(`.${SLUG}-edit`)
    if ($edit) {
      $edit.remove()
    }
    $edit = document.createElement('a')
    $edit.innerHTML = endent`
      <i class="fi-pencil" aria-hidden="true"></i>
      Bearbeiten
    `
    $edit.classList.add(`${SLUG}-edit`, 'right', 'button', 'radius')
    $edit.style.padding = '.4rem 1.1rem'
    $edit.style.margin = '0 1rem 0 0'
    $edit.setAttribute('href', `/listen/bearbeiten/${match |> last}`)
    $heading.append($edit)
  }
}
