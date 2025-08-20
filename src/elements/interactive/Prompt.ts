import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {interactiveStyles} from "./styles.ts";


@customElement('lmnt-prompt')
export class Prompt extends LitElement {
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
    'lmnt-prompt': Prompt
  }
}
