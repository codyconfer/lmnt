import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {contentStyles} from '@elements/content/styles.ts'


@customElement('lmnt-icon-header')
export class IconHeader extends LitElement {
  static styles = [
    contentStyles,
    css`
      .icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid var(--accent-0);
      }

      .icon-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        gap: 1rem;
        color: var(--foreground-0);
      }

      .icon-text {
        font-family: var(--mono-font), monospace;
      }
    `
  ]

  @property()
  src: string = '/icon.webp'

  @property()
  link: string = '/'

  @property()
  alt: string = 'sauce'

  render() {
    return html`
      <a class="icon-link" href="${this.link}">
        <img src="${this.src}" alt="${this.alt}" class="icon"/>
        <h1 class="icon-text">
          <slot></slot>
        </h1>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-icon-header': IconHeader
  }
}
