import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {photoStyles} from '@elements/gallery/styles.ts'


@customElement('lmnt-photo-grid')
export class PhotoGrid extends LitElement {
  static styles = [
    photoStyles,
    css`
    `
  ]

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
