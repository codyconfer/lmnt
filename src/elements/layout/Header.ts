import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {layoutStyles} from "@elements/layout/styles.ts";


@customElement('lmnt-header')
export class Header extends LitElement {
  static styles = [
    layoutStyles,
    css`
      :host {
        margin: 0 3rem;
      }
      header div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }

      @media only screen and (max-width: 480px) {
        :host,
        header,
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0;
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
