import { defineWebExtConfig } from 'wxt';

export default defineWebExtConfig({
  chromiumArgs: ['https://www.werstreamt.es/filme-serien/liste-411079'],
  chromiumProfile: 'userdata', // chromiumArgs: ['--user-data-dir=userdata'] doesn't keep sessions across dev restarts,
  keepProfileChanges: true,
});
