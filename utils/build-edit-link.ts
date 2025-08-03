import endent from 'endent';

export default () => {
  const match = globalThis.location.pathname.match(FRONT_VIEW_REGEX);

  if (match) {
    let editLink = document.querySelector<HTMLElement>(
      `.${EXTENSION_SLUG}-edit`,
    );

    if (editLink) {
      editLink.remove();
    }

    editLink = document.createElement('a');

    editLink.innerHTML = endent`
      <i class="fi-pencil" aria-hidden="true"></i>
      Bearbeiten
    `;

    editLink.classList.add(
      `${EXTENSION_SLUG}-edit`,
      'right',
      'button',
      'radius',
    );

    editLink.style.padding = '.4rem 1.1rem';
    editLink.style.margin = '0 1rem 0 0';
    editLink.setAttribute('href', `/listen/bearbeiten/${match.at(-1)}`);
    const heading = document.querySelector('h1')!;
    heading.append(editLink);
  }
};
