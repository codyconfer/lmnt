import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
// @ts-ignore
//import {history} from '../../events'
import {interactiveStyles} from "./styles.ts";


@customElement('lmnt-console')
export class Console extends LitElement {
  static styles = [interactiveStyles]

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
