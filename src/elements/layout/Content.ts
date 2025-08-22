import {css, html, LitElement} from "lit"
import {customElement} from "lit/decorators.js"
import {layoutStyles} from "@elements/layout/styles.ts"

@customElement("lmnt-content")
export class Content extends LitElement {
  static styles = [
    layoutStyles,
    css`
      :host {
        display: flex;
        flex: fit-content;
        margin: 0 3rem;
      }

      .content {
        gap: 1rem;
      }

      @media only screen and (max-width: 768px) {
        :host {
          margin: 0;
        }
      }
    `
  ]

  render() {
    return html`
      <section class="container">
        <div class="wrapper content">
          <slot></slot>
        </div>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lmnt-content": Content
  }
}
