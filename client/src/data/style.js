import {css} from 'styled-components';

const sizes = {
    md:500, //tablety
    lg:1000, //laptopy
    hd:1600 //komputery
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {});

export const leadingColor = "#ede51a";