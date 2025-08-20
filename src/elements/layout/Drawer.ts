import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {layoutStyles} from '@elements/layout/styles.ts'


@customElement('lmnt-drawer')
export class Drawer extends LitElement {
  static styles = [
    layoutStyles,
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
    'lmnt-drawer': Drawer
  }
}
