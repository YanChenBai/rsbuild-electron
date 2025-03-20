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
    ['electron:hover', {}],
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
    ['no-drag', { '-webkit-app-region': 'no-drag' }],
    ['drag', { '-webkit-app-region': 'drag' }],
    ['drag-inactive', { '-webkit-app-region': 'drag-inactive' }],
    ['resize', { '-webkit-app-region': 'no-resize' }],
    [
      'flex-box',
      {
        'display': 'flex',
        'width': '100%',
        'justify-content': 'center',
        'align-items': 'center',
      },
    ],
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
