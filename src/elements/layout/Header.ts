import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {layoutStyles} from "@elements/layout/styles.ts";


@customElement('lmnt-header')
export class Header extends LitElement {
  static styles = [
    layoutStyles,
    css`
      :host,
      header,
      .wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
      }

      @media only screen and (max-width: 480px) {
        :host,
        header,
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
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
