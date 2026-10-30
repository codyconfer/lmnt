import {css} from 'lit';
import {baseStyles} from '@elements/styles.ts';


export const layoutStyles = [
  baseStyles,
  css`
    .container {
      display: flex;
      justify-content: center;
    }

    :host {
      --content-narrow: 1280px;
      --content-standard: 1980px;
      --content-wide: 3840px;
    }

    .wrapper {
      flex: fit-content;
      max-width: var(--content-width, var(--content-narrow));
      padding: 1.5rem;
    }

    .content-narrow { --content-width: var(--content-narrow); }
    .content-standard { --content-width: var(--content-standard); }
    .content-wide { --content-width: var(--content-wide); }

    .wrapper-small {
      flex: fit-content;
      max-width: 1024px;
      padding: 1.5rem;
    }
  `
]
