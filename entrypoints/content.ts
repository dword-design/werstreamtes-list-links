export default defineContentScript({
  main: () => {
    buildEditLink();
    buildViewLink();
    fixListLinks();
  },
  matches: ['https://www.werstreamt.es/*'],
});
