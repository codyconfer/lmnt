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
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 3rem;
      }
      img {
        justify-content: center;
        height: 4rem;
        width: auto;
      }
      @media only screen and (max-width: 480px) {
        .icon-row {
          align-items: center;
          justify-content: center;
        }
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
