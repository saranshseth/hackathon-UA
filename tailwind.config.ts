import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: {
            'intrepid-red': '#ff2828',
            'midnight': '#222',
            'sand': '#f6f4f0',
            'wet-sand': '#e6e1d7',
            'earth': '#d8cab6',
            'white': '#fff',
            'intrepid-red-weaker': '#ffc2c2',
            'intrepid-red-weak': '#ff7d7d',
            'intrepid-red-strong': '#eb0000',
            'intrepid-red-stronger': '#c80000',
            'midnight-weak': '#42576a',
            'midnight-strong': '#151f28',
          },
          secondary: {
            'okvango': '#0a6e50',
            'sa-pa': '#50b464',
            'santorini': '#4178ff',
            'laguna': '#ffa0b9',
            'drake': '#244d8d',
            'glacier': '#50dcd2',
            'luxor': '#ffc828',
            'sahara': '#ff9155',
            'plum-dark': '#761035',
          }
        },
        ui: {
          text: {
            dark: {
              primary: '#fff',
              weak: '#dedede',
              label: 'rgb(255 255 255 / 55%)',
              link: '#94bfff',
              'link-hover': '#c7ddff',
              'link-pressed': '#61a0ff',
              'link-visited': '#fc9eff',
              'link-visited-hover': '#fed1ff',
              'link-visited-pressed': '#fa6bff',
              disabled: '#bebebe',
            }
          },
          background: '#fff',
          'background-dark': '#2d2d2d',
          alert: {
            success: '#438443',
            'success-weakest': '#efe',
            'success-weak': '#5fce5f',
            'success-strong': '#2a6a2a',
            'success-strongest': '#0b450b',
            warning: '#ffbd40',
            'warning-weakest': '#fff5e3',
            'warning-weak': '#ffd992',
            'warning-strong': '#dba032',
            'warning-strongest': '#6f4a06',
            error: '#d8343d',
            'error-weakest': '#ffefef',
            'error-weak': '#ec9296',
            'error-strong': '#962229',
            'error-strongest': '#531014',
            info: '#3484ab',
            'info-weakest': '#e9f8ff',
            'info-weak': '#8fbed5',
            'info-strong': '#206080',
            'info-strongest': '#0b3c54',
          },
          grey: {
            weaker: '#efefef',
            weak: '#dedede',
            DEFAULT: '#bebebe',
            strong: '#757575',
            stronger: '#505050',
          }
        }
      },
    },
  },
  plugins: [],
}
export default config