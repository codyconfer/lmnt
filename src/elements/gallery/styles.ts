import {css} from 'lit';
import {baseStyles} from '@elements/styles.ts';


export const galleryStyles = [
  baseStyles,
  css`
    /* reset.css is a document stylesheet and does not cross the shadow boundary,
       so box-sizing and the img/button defaults have to be re-declared here. */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    img {
      display: block;
      max-width: 100%;
    }

    button {
      padding: 0;
      border: 0;
      background: none;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      cursor: pointer;
    }

    button:focus-visible {
      outline: 2px solid var(--highlight-1);
      outline-offset: 2px;
    }
  `
]
