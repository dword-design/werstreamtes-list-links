export default () => {
  const run = () => {
    const listLinks = document.querySelectorAll(
      [
        '.top-bar',
        ...(globalThis.location.pathname.startsWith('/listen/meine')
          ? ['.Content']
          : []),
      ]
        .map(selector => `${selector} a[href^="/listen/bearbeiten/"]`)
        .join(', '),
    );

    for (const link of listLinks) {
      const href = link.getAttribute('href')!;
      const match = href.match(EDIT_VIEW_REGEX)!;
      link.setAttribute('href', `/filme-serien/liste-${match.at(-1)}`);
    }
  };

  const observer = new MutationObserver(run);
  const topBar = document.querySelector('.top-bar')!;
  observer.observe(topBar, { childList: true });
  run();
};
