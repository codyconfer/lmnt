import {css} from 'lit-element';
import {baseStyles} from '@elements/styles.ts';


export const layoutStyles = [
  baseStyles,
  css`
    .container {
      display: flex;
      justify-content: center;
    }

    .wrapper {
      flex: fit-content;
      max-width: 1280px;
      padding: 1.5rem;
    }

    .wrapper-small {
      flex: fit-content;
      max-width: 1024px;
      padding: 1.5rem;
    }
  `
]
