import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {layoutStyles} from '@elements/layout/styles.ts';

@customElement("lmnt-content-slim")
export class ContentSlim extends LitElement {
  static styles = [
    layoutStyles,
    css`
      .content {
        gap: 1rem;
      }
    `,
  ];

  render() {
    return html`
      <section class="container">
        <div class="wrapper-slim content">
          <slot></slot>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lmnt-content-slim": ContentSlim;
  }
}
