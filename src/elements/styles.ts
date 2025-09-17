import {css} from 'lit-element';


export const baseStyles =
  css`
    h2 {
      color: var(--accent-0);
    }

    h3 {
      color: var(--accent-1);
    }

    h4 {
      color: var(--accent-2);
    }

    h5, li > strong {
      color: var(--accent-3);
    }

    hr {
      color: var(--muted-0);
      opacity: 42%;
      margin: 0;
    }

    a {
      color: var(--highlight-1);
    }

    a:hover {
      color: var(--highlight-0);
    }

    pre {
      background-color: var(--background-1);
      padding: 1rem;
    }

    blockquote {
      margin: 2rem 0;
      background-color: var(--background-1);
      border-left: 0.2rem solid var(--foreground-0);
      border-radius: 0.2rem 1rem 1rem 0.2rem;
    }
    blockquote p {
      margin: 1rem 2rem;
      padding: 2rem 0;
      color: var(--foreground-1)
    }
    .horizontal-center {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .icon,
    .logo {
      height: 24px;
      width: 24px;
    }
    .hidden {
      display: none;
    }
    .small-text {
      font-size: 0.7rem;
    }
    .sans {
      font-family: var(--sans-font), sans-serif;
    }
    .mono {
      font-family: var(--mono-font), monospace;
    }
    .dyslexic {
      font-family: var(--dyslexic-font), sans-serif;
    }
  `
