import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'


@customElement('lmnt-accessibility')
export class Accessibility extends LitElement {
  static styles = []

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-accessibility': Accessibility
  }
}
