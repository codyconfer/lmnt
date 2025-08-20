import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {layoutStyles} from "./styles.ts";


@customElement('lmnt-header')
export class Header extends LitElement {
  static styles = [
    layoutStyles,
    css`
      header .wrapper {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
      }
    `]

  render() {
    return html`
      <header class="container">
        <div class="wrapper">
          <slot></slot>
        </div>
      </header>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-header': Header
  }
}
