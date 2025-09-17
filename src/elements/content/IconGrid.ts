import {customElement} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {contentStyles} from "@elements/content/styles.ts";


@customElement('lmnt-icon-grid')
export class IconGrid extends LitElement {
  static styles = [
    contentStyles,
    css`
      .icon-grid {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 2rem;
      }
    `
  ]

  render() {
    return html`
      <div class="icon-grid">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-icon-grid': IconGrid
  }
}
