import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {layoutStyles} from "@elements/layout/styles.ts";


@customElement('lmnt-footer')
export class Footer extends LitElement {
  static styles = [
    layoutStyles,
    css`
      :host {
        margin: 0 3rem;
      }
      footer div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .copyright {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.8rem;
      }
      @media only screen and (max-width: 480px) {
        :host {
          margin: 0;
        }
        .wrapper {
          padding: 0.5rem;
        }
        .copyright {
          font-size: 0.7rem;
        }
      }
    `]

  readonly year = new Date().getFullYear()

  render() {
    return html`
      <footer class="container">
        <div class="wrapper">
          <div>
            <slot></slot>
          </div>
          <div class="copyright">
            <slot name="right"></slot>
            <span>&copy;</span>
            <span>${this.year}</span>
          </div>
        </div>
      </footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-footer': Footer
  }
}
