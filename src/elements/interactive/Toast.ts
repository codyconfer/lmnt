import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'


@customElement('lmnt-toast')
export class Toast extends LitElement {
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
    'lmnt-toast': Toast
  }
}
