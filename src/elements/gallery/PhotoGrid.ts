import {css, html, LitElement, nothing} from 'lit'
import {customElement, property, query, queryAssignedElements, state} from 'lit/decorators.js'
import {galleryStyles} from '@elements/gallery/styles.ts'
import {Photo, type PhotoSelectDetail} from '@elements/gallery/Photo.ts'


@customElement('lmnt-photo-grid')
export class PhotoGrid extends LitElement {
  static styles = [
    galleryStyles,
    css`
      :host {
        display: block;
      }

      .photo-grid {
        display: grid;
        grid-template-columns: repeat(var(--columns, 3), minmax(0, 1fr));
        gap: var(--photo-gap, 1rem);
        width: 100%;
      }

      /* the [open] is load-bearing: the UA sheet's dialog:not([open]) { display: none }
         loses to an author display on the bare selector, leaking a visible closed dialog */
      dialog.lightbox[open] {
        display: flex;
        position: fixed;
        inset: 0;
        width: auto;
        height: auto;
        max-width: none;
        max-height: none;
        margin: 0;
        padding: 4.5rem 1rem 1.5rem;
        border: 0;
        overflow: hidden;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        background-color: transparent;
        color: var(--foreground-0);
      }

      /* ::backdrop only inherits custom properties in newer engines;
         the literal is what --background-0 resolves to today */
      dialog.lightbox::backdrop {
        background-color: var(--background-0, #21252b);
        opacity: 0.94;
      }

      .full {
        max-width: min(100%, 1600px);
        max-height: calc(100dvh - 10rem);
        min-height: 0;
        object-fit: contain;
        border-radius: var(--photo-radius, 0.25rem);
      }

      .meta {
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
        margin: 0;
        color: var(--foreground-1);
      }

      .counter {
        color: var(--muted-0);
      }

      .nav {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        font-size: 1.75rem;
        line-height: 1;
        background-color: var(--background-1);
        color: var(--foreground-1);
      }

      .nav:hover {
        color: var(--accent-0);
      }

      .prev,
      .next {
        top: 50%;
        transform: translateY(-50%);
      }

      .prev {
        left: 1rem;
      }

      .next {
        right: 1rem;
      }

      .close {
        top: 1rem;
        right: 1rem;
      }

      @keyframes lightbox-in {
        from {
          opacity: 0;
          transform: scale(0.98);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      @keyframes backdrop-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 0.94;
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        dialog.lightbox[open] {
          animation: lightbox-in 160ms ease-out;
        }

        dialog.lightbox[open]::backdrop {
          animation: backdrop-in 160ms ease-out;
        }
      }

      @media only screen and (max-width: 768px) {
        .photo-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media only screen and (max-width: 480px) {
        .photo-grid {
          grid-template-columns: minmax(0, 1fr);
        }

        dialog.lightbox[open] {
          padding: 3.5rem 0.5rem 1rem;
        }

        .nav {
          width: 2.5rem;
          height: 2.5rem;
          font-size: 1.5rem;
        }

        .prev {
          left: 0.5rem;
        }

        .next {
          right: 0.5rem;
        }

        .close {
          top: 0.5rem;
          right: 0.5rem;
        }
      }
    `
  ]

  @property({type: Number})
  columns: number = 3

  @queryAssignedElements({selector: 'lmnt-photo'})
  private _photos!: Photo[]

  @query('dialog')
  private _dialog!: HTMLDialogElement | null

  @state()
  private _index: number = -1

  private _scrollLock: string = ''

  private get _columns(): number {
    return Number.isFinite(this.columns) && this.columns > 0 ? Math.trunc(this.columns) : 3
  }

  private get _current(): Photo | undefined {
    return this._photos[this._index]
  }

  private _onSlotChange() {
    if (this._index < 0) return
    if (this._index >= this._photos.length) {
      this._close()
      return
    }
    this.requestUpdate()
  }

  private async _onSelect(e: CustomEvent<PhotoSelectDetail>) {
    const index = this._photos.indexOf(e.detail.photo)
    if (index < 0) return
    this._index = index
    /* the index has to reach the DOM before showModal, or the first frame is wrong */
    await this.updateComplete
    const dialog = this._dialog
    if (!dialog || dialog.open) return
    this._scrollLock = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
  }

  /* every close route funnels through the native close event, which is what keeps
     _index honest and lets the dialog restore focus to the tile that opened it */
  private _close() {
    this._dialog?.close()
  }

  private _onClose() {
    this._index = -1
    document.body.style.overflow = this._scrollLock
  }

  private _step(delta: number) {
    const total = this._photos.length
    if (total === 0) return
    this._index = (this._index + delta + total) % total
  }

  private _prev() {
    this._step(-1)
  }

  private _next() {
    this._step(1)
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      this._next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      this._prev()
    }
  }

  /* ::backdrop cannot be an event target, so clicks out there land on the dialog itself */
  private _onDialogClick(e: MouseEvent) {
    if (e.target === e.currentTarget) this._close()
  }

  render() {
    const current = this._current
    return html`
      <div class="photo-grid" style="--columns:${this._columns}" @lmnt-photo-select=${this._onSelect}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
      <dialog
        class="lightbox"
        aria-label="photo viewer"
        @close=${this._onClose}
        @keydown=${this._onKeydown}
        @click=${this._onDialogClick}>
        ${current
          ? html`
            <img class="full" src="${current.fullSrc}" alt="${current.alt}" decoding="async"/>
            <p class="meta" aria-live="polite">
              <span>${current.caption || current.alt}</span>
              <span class="counter small-text mono">${this._index + 1} / ${this._photos.length}</span>
            </p>
            <button class="prev nav" type="button" aria-label="previous photo" @click=${this._prev}>
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button class="next nav" type="button" aria-label="next photo" @click=${this._next}>
              <span aria-hidden="true">&rsaquo;</span>
            </button>
            <button class="close nav" type="button" aria-label="close viewer" autofocus @click=${this._close}>
              <span aria-hidden="true">&times;</span>
            </button>
          `
          : nothing}
      </dialog>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-photo-grid': PhotoGrid
  }
}
