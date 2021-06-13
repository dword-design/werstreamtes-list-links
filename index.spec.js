import tester from '@dword-design/tester'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import execa from 'execa'
import P from 'path'

export default tester(
  {
    async works() {
      console.log(process.env.EMAIL)
      console.log(process.env.PASSWORD)
      await this.page.goto('https://werstreamt.es')

      const acceptCookiesButton = await this.page.waitForSelector(
        '.cmpboxbtnyes'
      )
      await acceptCookiesButton.click()
      await this.page.click('li.login a')
      expect(await this.page.screenshot()).toMatchImageSnapshot(this)
      await this.page.type('input[type=email]', process.env.USER_EMAIL)
      await this.page.type('input[type=password]', process.env.USER_PASSWORD)
      await this.page.click('input[type=submit]')
      expect(await this.page.screenshot()).toMatchImageSnapshot(this)
    },
  },
  [
    { before: () => execa.command('base prepublishOnly') },
    testerPluginPuppeteer({
      launchOptions: {
        args: [
          `--load-extension=${P.join(process.cwd(), 'dist')}`,
          `--disable-extensions-except=${P.join(process.cwd(), 'dist')}`,
        ],
        headless: false,
      },
    }),
  ]
)
