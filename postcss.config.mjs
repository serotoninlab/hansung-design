import { presetAttributify, presetIcons, presetWind3 } from 'unocss';

const config = {
  plugins: {
    '@unocss/postcss': {
      content: ['./app/**/*.{html,js,ts,jsx,tsx}'],
      presets: [
        presetWind3(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    },
  },
};

export default config;
