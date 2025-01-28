import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'main-bg-logo': 'url(/logo.svg)',
        'dark-main-bg-logo': 'url(/logo-white.svg)',
        'razorpay': 'url(/razorpay.svg)',
        'dark-razorpay': 'url(/razorpay_white.svg)',
        'cert': 'url(/cert.svg)',
      },
      screens: {
        xs: { max: '320px', min: '0px' },
        sm: { max: '412px', min: '321px' },
        sm2: { max: '576px', min: '413px' },
        sm3: { max: '767px', min: '577px' },
        md: { max: '1023px', min: '768px' },
        lg: { max: '1279px', min: '1024px' },
        xl: { max: '1535px', min: '1280px' },
        '2xl': { max: '1919px', min: '1536px' },
        '3xl': { max: '7680px', min: '1920px' },
      },
      colors: {
        whitesmoke: '#f4f4f4',
        white: '#fff',
        black: '#000',
        'primary-pari-red': '#b82929',
        'primary-pari-blue': '#2f80ed',
        'gray-9': '#333333',
        'gray-8': '#EDEDED',
        'gray-7': '#BDBDBD',
        'gray-5': '#e0e0e0',
        'gray-3': '#828282',
        'gray-4': '#282828',
        'gray-1': '#333',
        'gray-2': '#4f4f4f',
        'primary-pari-black': '#181818',
        gray: '#202020',
        'gray-6': '#f2f2f2',
        'blue-1': '#2f80ed',
        yellow: '#f2c94c',
        'primary-pari-accent-red': '#ffe8e8',
      },
      fontFamily: {
        sans: "'Noto Sans'",
        serif: "'Noto Serif'",
      },
      borderRadius: {
        '29xl': '48px',
        '13xl': '32px',
        '45xl': '64px',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
    // function ({ addComponents }: { addComponents: (components: Record<string, unknown>) => void }) {
    //   addComponents({
	// 	'.container': {
	// 		maxWidth: '100%',
	// 		marginLeft: 'auto', // Auto margin left
	// 		marginRight: 'auto', // Auto margin right
	// 		'@screen xs': {
	// 		  maxWidth: '18rem', //288px
	// 		},
	// 		'@screen sm': {
	// 		  maxWidth: '23.75rem ', // 380px  / 16px
	// 		},
	// 		'@screen sm2': {
	// 		  maxWidth: '33rem', // 528px  / 16px
	// 		},
	// 		'@screen sm3': {
	// 		  maxWidth: '37rem', // 592px  / 16px
	// 		},
	// 		'@screen md': { 
	// 		  maxWidth: '43rem', // 688px / 16px
	// 		},
	// 		'@screen lg': {
	// 		  maxWidth: '57rem', // 912px / 16px
	// 		},
	// 		'@screen xl': {
	// 		  maxWidth: '73rem', // 1168px / 16px
	// 		},
	// 		'@screen 2xl': {
	// 		  maxWidth: '76.5rem', // 1224px / 16px
	// 		},
	// 		'@screen 3xl': {
	// 		  maxWidth: '76.5rem', // 1124px / 16px
	// 		},
	// 	  },
	// 	  '.text-container': {
	// 		maxWidth: '100%',
	// 		marginLeft: 'auto',
	// 		marginRight: 'auto',
	// 		'@screen xs': {
	// 		  maxWidth: '15rem', // 240px / 16px
	// 		},
	// 		'@screen sm': {
	// 		  maxWidth: '20.75rem', // 332px / 16px
	// 		},
	// 		'@screen sm2': {
	// 		  maxWidth: '31rem', // 496px / 16px
	// 		},
	// 		'@screen sm3': {
	// 		  maxWidth: '33rem', // 528px / 16px
	// 		},
	// 		'@screen md': {
	// 		  maxWidth: '32rem', // 512px / 16px
	// 		},
	// 		'@screen lg': {
	// 		  maxWidth: '37.625rem', // 602px / 16px
	// 		},
	// 		'@screen xl': {
	// 		  maxWidth: '38.75rem', // 620px / 16px
	// 		},
	// 		'@screen 2xl': {
	// 		  maxWidth: '38.75rem', // 620px / 16px
	// 		},
	// 		'@screen 3xl': {
	// 		  maxWidth: '38.75rem', // 620px / 16px
	// 		},
	// 	  },
    //   });
    // },
  ],
};

export default config;
