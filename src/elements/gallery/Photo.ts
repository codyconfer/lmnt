import {css, html, LitElement, nothing} from 'lit'
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
      }

      .photo {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        width: 100%;
        /* the grid stretches the host to the row height; fill it so a captionless
           tile's background box still lines up with its neighbours */
        height: 100%;
        border: 2px solid transparent;
        border-radius: var(--photo-radius, 0.25rem);
        background-color: var(--background-1);
        transition: border-color 120ms ease-out, transform 120ms ease-out;
      }

      .photo img {
        width: 100%;
        aspect-ratio: var(--photo-ratio, 1);
        object-fit: cover;
        border-radius: calc(var(--photo-radius, 0.25rem) - 2px);
        background-color: var(--background-1);
      }

      .photo:hover {
        border-color: var(--accent-0);
      }

      .photo:focus-visible {
        border-color: var(--highlight-1);
      }

      .caption {
        padding: 0 0.35rem 0.35rem;
        text-align: left;
        color: var(--muted-0);
        font-family: var(--sans-font), sans-serif;
      }

      @media (prefers-reduced-motion: no-preference) {
        .photo:hover {
          transform: translateY(-2px);
        }
      }
    `
  ]

  @property()
  src: string = ''

  /* the long description, read by screen readers -- keep it distinct from caption */
  @property()
  alt: string = ''

  /* the short visible label under the tile */
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
        ${this.caption ? html`<span class="caption small-text">${this.caption}</span>` : nothing}
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
