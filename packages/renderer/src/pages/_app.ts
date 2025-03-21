import type { App } from 'vue'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'

const Theme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fff5f8',
      100: '#ff85a7',
      200: '#ff6b95',
      300: '#ff5988',
      400: '#ff5282',
      500: '#ff3e75',
      600: '#d93563',
      700: '#b32b52',
      800: '#8c2240',
      900: '#66192f',
      950: '#40101d',
    },
  },
})

export default (app: App) => {
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Theme,
    },
  })
}
