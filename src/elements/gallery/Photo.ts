import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {galleryStyles} from '@elements/gallery/styles.ts'


export const PHOTO_SELECT = 'lmnt-photo-select'

export interface PhotoSelectDetail {
  photo: Photo
}

@customElement('lmnt-photo')
export class Photo extends LitElement {
  static styles = [
    galleryStyles,
    css`
      :host {
        display: block;
        break-inside: avoid;
      }

      .photo {
        display: block;
        width: 100%;
        /* clips the hover zoom */
        overflow: hidden;
        border-radius: var(--photo-radius, 0.25rem);
        /* placeholder while the image loads */
        background-color: var(--background-1);
      }

      .photo img {
        width: 100%;
        height: auto;
        transition: filter 200ms ease-out;
      }

      .photo:hover img {
        filter: brightness(1.08);
      }

      @media (prefers-reduced-motion: no-preference) {
        .photo img {
          transition: transform 200ms ease-out, filter 200ms ease-out;
        }

        .photo:hover img {
          transform: scale(1.03);
        }
      }
    `
  ]

  @property()
  src: string = ''

  /* the long description, read by screen readers -- keep it distinct from caption */
  @property()
  alt: string = ''

  /* shown in the lightbox meta row; not rendered on the tile */
  @property()
  caption: string = ''

  /* optional hi-res source used only by the lightbox */
  @property()
  full: string = ''

  @property()
  loading: 'lazy' | 'eager' = 'lazy'

  get fullSrc(): string {
    return this.full || this.src
  }

  private _select() {
    const detail: PhotoSelectDetail = {photo: this}
    this.dispatchEvent(new CustomEvent<PhotoSelectDetail>(PHOTO_SELECT, {
      detail,
      bubbles: true,
      composed: true
    }))
  }

  render() {
    return html`
      <button class="photo" type="button" @click=${this._select}>
        <img src="${this.src}" alt="${this.alt}" loading="${this.loading}" decoding="async"/>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-photo': Photo
  }

  interface HTMLElementEventMap {
    'lmnt-photo-select': CustomEvent<PhotoSelectDetail>
  }
}
