import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['./dist', './out'],
  typescript: true,
  astro: true,
  stylistic: true,
}, {
  rules: {
    'style/indent': ['error', 2],
    'style/no-tabs': ['error'],
  },
})
