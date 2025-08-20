import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'


@customElement('lmnt-photo-grid')
export class PhotoGrid extends LitElement {
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
    'lmnt-photo-grid': PhotoGrid
  }
}
