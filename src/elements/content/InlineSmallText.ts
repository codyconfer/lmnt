import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {contentStyles} from '@elements/content/styles.ts'


@customElement('lmnt-i-smtxt')
export class InlineSmallText extends LitElement {
  static styles = [
    contentStyles,
    css`
      .small-text {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
      }
    `
  ]


  render() {
    return html`
      <div class="horizontal-center">
        <span class="small-text">
          <slot></slot>
        </span>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-i-smtxt': InlineSmallText
  }
}
