import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {cliStyles} from '@elements/cli/styles.ts'


@customElement('lmnt-console')
export class Console extends LitElement {
  static styles = [
    cliStyles,
    css`
    `
  ]

  render() {
    return html`
      <div class="mono">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-console': Console
  }
}
