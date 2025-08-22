import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {layoutStyles} from "@elements/layout/styles.ts";


@customElement('lmnt-nav')
export class Nav extends LitElement {
  static styles = [
    layoutStyles,
    css`
      .wrapper {
        display: flex;
      }
    `
  ]

  render() {
    return html`
      <nav class="wrapper">
        <slot></slot>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-nav': Nav
  }
}
