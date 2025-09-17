import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {contentStyles} from '@elements/content/styles.ts'


@customElement('lmnt-img-link')
export class ImgLink extends LitElement {
  static styles = [
    contentStyles,
    css`
      .icon,
      .logo {
        height: 24px;
        width: 24px;
      }
    `
  ]

  @property()
  link: string = 'https://lit.dev/'

  @property()
  src: string = '/lit.svg'

  @property()
  alt: string = 'lit'

  @property()
  new: boolean = false

  render() {
    return html`
      <a href="${this.link}" ${this.new ? 'target="_blank"' : ''}>
        <img src="${this.src}" alt="${this.alt}" class="icon"/>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-img-link': ImgLink
  }
}
