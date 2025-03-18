// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  rules: [
    [/^h-(\d+)dvh$/, ([_, d]) => {
      return [
        ['height', `${d}vh`],
        ['height', `${d}dvh`],
      ]
    }],
    [/^min-h-(\d+)dvh$/, ([_, d]) => {
      return [
        ['min-height', `${d}vh`],
        ['min-height', `${d}dvh`],
      ]
    }],
    [/^max-h-(\d+)dvh$/, ([_, d]) => {
      return [
        ['max-height', `${d}vh`],
        ['max-height', `${d}dvh`],
      ]
    }],
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        lobster: 'Lobster',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
