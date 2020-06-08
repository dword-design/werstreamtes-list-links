import { endent, last } from '@dword-design/functions'
import { SLUG } from './variables.config'
import editViewRegex from './edit-view-regex'

export default () => {
  const match = window.location.pathname.match(editViewRegex)
  if (match) {
    const $heading = document.querySelector('h1')

    let $view = document.querySelector(`.${SLUG}-view`)
    if ($view) {
      $view.remove()
    }
    $view = document.createElement('a')
    $view.innerHTML = endent`
      <i class="fi-eye" aria-hidden="true"></i>
      Ansehen
    `
    $view.classList.add(`${SLUG}-view`, 'button', 'radius')
    $view.style.padding = '.4rem 1.1rem'
    $view.style.margin = '0 0 .75rem 0'
    $view.setAttribute('href', `/filme-serien/liste-${match |> last}`)
    $heading.after($view)
  }
}
