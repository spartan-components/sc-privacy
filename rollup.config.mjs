import terser from "@rollup/plugin-terser"

export default {
  input: [
    './src/sc-privacy-modal.js',
    './src/sc-privacy-widget.js',
  ],
  output: [
    {
      format: 'es',
      dir: 'dist',
    },
    {
      entryFileNames: ({name}) => `${name}.min.js`,
      format: 'es',
      dir: 'dist',
      plugins: [
        terser(),
      ],
    }
  ]
}
