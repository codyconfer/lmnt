import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {contentStyles} from '@elements/content/styles.ts'


@customElement('lmnt-avatar-header')
export class AvatarHeader extends LitElement {
  static styles = [
    contentStyles,
    css`
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid var(--accent-0);
      }

      .avatar-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        gap: 1rem;
        color: var(--foreground-0);
      }

      .avatar-text {
        font-family: var(--mono-font), monospace;
      }
    `
  ]

  @property()
  src: string = '/avatar.webp'

  @property()
  link: string = '/'

  render() {
    return html`
      <a class="avatar-link" href="${this.link}">
        <img src="${this.src}" alt="sauce" class="avatar"/>
        <h1 class="avatar-text">
          <slot></slot>
        </h1>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-avatar-header': AvatarHeader
  }
}
