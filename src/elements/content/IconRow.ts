import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {contentStyles} from "@elements/content/styles.ts";

export interface Img {
  src: string
  alt: string
  link?: string
  class?: string
  new?: boolean
}

@customElement('lmnt-icon-row')
export class IconRow extends LitElement {
  static styles = [
    contentStyles,
    css`
      .icon-row {
        display: flex;
        gap: 3rem;
        justify-content: center;
      }
      img {
        height: 4rem;
        width: auto;
      }
    `
  ]

  @property({type: Array})
  icons: Img[] = [];

  render() {
    return html`
      <div class="icon-row">
        ${this.icons.map(
          icon => {
            return icon.link
              ? html`
                <a href="${icon.link}" ${icon.new ? 'target="_blank"' : ''}>
                  <img src="${icon.src}" alt="${icon.alt}" class="${icon.class}">
                </a>
              `
              : html`<img src="${icon.src}" alt="${icon.alt}" class="${icon.class}">`
          }
        )}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-icon-row': IconRow
  }
}
