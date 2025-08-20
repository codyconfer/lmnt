import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {layoutStyles} from '@elements/layout/styles.ts'


@customElement('lmnt-veil')
export class Veil extends LitElement {
  static styles = [
    layoutStyles,
    css`
      main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100vh;
        margin: 0;
      }
    `
  ]

  render() {
    return html`
      <main class="veil">
        <slot></slot>
      </main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-veil': Veil
  }
}
