import endent from 'endent';

export default () => {
  const match = globalThis.location.pathname.match(EDIT_VIEW_REGEX);

  if (match) {
    let view = document.querySelector<HTMLElement>(`.${EXTENSION_SLUG}-view`);

    if (view) {
      view.remove();
    }

    view = document.createElement('a');

    view.innerHTML = endent`
      <i class="fi-eye" aria-hidden="true"></i>
      Ansehen
    `;

    view.classList.add(`${EXTENSION_SLUG}-view`, 'button', 'radius');
    view.style.padding = '.4rem 1.1rem';
    view.style.margin = '0 0 .75rem 0';
    view.setAttribute('href', `/filme-serien/liste-${match.at(-1)}`);
    const heading = document.querySelector('h1')!;
    heading.after(view);
  }
};
