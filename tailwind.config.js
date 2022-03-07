const _ = require('lodash')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {

  darkMode: false,
  corePlugins: {
    preflight: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
    space: false,
    placeholderColor: false,
    placeholderOpacity: false,
    ringWidth: false,
    boxShadow: false,
    container: false,
    borderColor: false,
  },
  separator: '_',
  theme: {
    spacing: {
      px: '1px',
      0: '0',
      '0_5': '0.125rem',
      1: '0.25rem',
      '1_5': '0.375rem',
      2: '0.5rem',
      '2_5': '0.625rem',
      3: '0.75rem',
      '3_5': '0.875rem',
      4: '1rem',
      '4_5': '1.125rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      18: '4.5rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
      full: '100%',
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1_2': '50%',
      '1_3': '33.333333%',
      '2_3': '66.666667%',
      '1_4': '25%',
      '2_4': '50%',
      '3_4': '75%',
      '1__5': '20%',
      '2__5': '40%',
      '3__5': '60%',
      '4__5': '80%',
      '1_6': '16.666667%',
      '2_6': '33.333333%',
      '3_6': '50%',
      '4_6': '66.666667%',
      '5_6': '83.333333%',
      screen: '100vh',
    }),
    inset: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1_2': '50%',
      '1_3': '33.333333%',
      '2_3': '66.666667%',
      '1_4': '25%',
      '2_4': '50%',
      '3_4': '75%',
      '-1_2': '-50%',
      '-1_3': '-33.333333%',
      '-2_3': '-66.666667%',
      '-1_4': '-25%',
      '-2_4': '-50%',
      '-3_4': '-75%',
      '-full': '-100%',
    }),
    translate: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1_2': '50%',
      '1_3': '33.333333%',
      '2_3': '66.666667%',
      '1_4': '25%',
      '2_4': '50%',
      '3_4': '75%',
      '-1_2': '-50%',
      '-1_3': '-33.333333%',
      '-2_3': '-66.666667%',
      '-1_4': '-25%',
      '-2_4': '-50%',
      '-3_4': '-75%',
      '-full': '-100%',
    }),
    width: (theme) => ({
      ...theme('height'),
      '1_12': '8.333333%',
      '2_12': '16.666667%',
      '3_12': '25%',
      '4_12': '33.333333%',
      '5_12': '41.666667%',
      '6_12': '50%',
      '7_12': '58.333333%',
      '8_12': '66.666667%',
      '9_12': '75%',
      '10_12': '83.333333%',
      '11_12': '91.666667%',
    }),
    screens: {},
    extend: {}
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const flattenColorPalette = (colors) =>
        Object.assign(
          {},
          ...Object.entries(colors).flatMap(([color, values]) =>
            typeof values == 'object'
              ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
                  [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
                }))
              : [{ [`${color}`]: values }]
          )
        )
      const colors = flattenColorPalette(theme('borderColor'))
      const utilities = _.map(colors, (value, key) => {
        return {
          [`.border-${key}`]: {
            borderColor: `${value}`
          }
        }
      })
      addUtilities(utilities)
    }),
    plugin(function({ addUtilities, theme }) {
      const utilities = _.map(theme('boxShadow'), (value, key) => {
        return {
          [key === 'DEFAULT' ? `.shadow` : `.shadow-${key}`]: {
            boxShadow: `${value}`
          }
        }
      })
      addUtilities(utilities)
    })
  ]
};