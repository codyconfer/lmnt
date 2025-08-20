import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'


@customElement('lmnt-photo')
export class Photo extends LitElement {
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
    'lmnt-photo': Photo
  }
}
