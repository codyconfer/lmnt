import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {cliStyles} from '@elements/cli/styles.ts'


@customElement('lmnt-prompt')
export class Prompt extends LitElement {
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
    'lmnt-prompt': Prompt
  }
}
