import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {layoutStyles} from "./styles.ts";


@customElement('lmnt-footer')
export class Footer extends LitElement {
  static styles = [
    layoutStyles,
    css`
      footer .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }

      .copyright {
        font-size: 0.8rem;
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
            &copy; ${this.year}
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
