import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {notificationStyles} from '@elements/notifications/styles.ts'


@customElement('lmnt-toast')
export class Toast extends LitElement {
  static styles = [
    notificationStyles,
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
    'lmnt-toast': Toast
  }
}
