import {css, html, LitElement, nothing} from 'lit'
import {customElement, property, query, state} from 'lit/decorators.js'

export interface AgendaEvent {
  title: string
  datetime: string
  location: string
  photo?: string
  photoAlt?: string
  description?: string
  details?: string
  address?: string
  notes?: string
  href?: string
}

@customElement('lmnt-event-agenda')
export class EventAgenda extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--foreground-0, #24212a);
      font-family: var(--body-font, inherit);
    }

    .agenda {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .event {
      display: grid;
      grid-template-columns: minmax(7rem, 12rem) minmax(0, 1fr);
      overflow: hidden;
      border: 1px solid var(--muted-0, #ddd6d1);
      border-radius: var(--event-radius, 0.75rem);
      background: var(--background-0, #fff);
    }

    .photo {
      width: 100%;
      height: 100%;
      min-height: 10rem;
      object-fit: cover;
      background: var(--background-1, #f2eeeb);
    }

    .event.no-photo { grid-template-columns: minmax(0, 1fr); }

    .event-card {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
      width: 100%;
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }

    .event-card:focus-visible { outline: 2px solid var(--accent-0, #8e536b); outline-offset: -3px; }
    .event:hover { border-color: var(--accent-0, #8e536b); }

    .details {
      align-self: center;
      padding: 1.25rem 1.5rem;
    }

    h3 {
      margin: 0 0 0.65rem;
      font-size: 1.25rem;
    }

    .event-title { color: inherit; font: inherit; font-weight: 700; }
    .detail-view { position: relative; width: min(52rem, calc(100vw - 2rem)); max-height: calc(100dvh - 2rem); overflow: auto; box-sizing: border-box; padding: clamp(2rem, 6vw, 4rem); border: 1px solid var(--muted-0, #ddd6d1); border-radius: var(--event-radius, 0.75rem); background: var(--background-0, #fff); color: var(--foreground-0, #24212a); box-shadow: 0 1.5rem 5rem rgb(0 0 0 / 30%); }
    .detail-view::backdrop { background-color: var(--background-0, #fff8f2); opacity: 0.96; }

    @keyframes detail-backdrop-in {
      from { opacity: 0; }
      to { opacity: 0.96; }
    }

    @media (prefers-reduced-motion: no-preference) {
      .detail-view[open]::backdrop { animation: detail-backdrop-in 160ms ease-out; }
    }
    .detail-view h3 { margin-top: 1rem; font-size: clamp(1.6rem, 5vw, 2.5rem); }
    .back { position: absolute; top: 0.75rem; right: 0.75rem; border: 0; padding: 0.4rem; color: var(--accent-0, #8e536b); background: none; font: inherit; cursor: pointer; }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1.25rem;
      margin: 0;
      color: var(--foreground-1, #625d67);
      font-size: 0.95rem;
    }

    .meta span { display: inline-flex; align-items: baseline; gap: 0.4rem; }
    .icon { color: var(--accent-0, #8e536b); }
    .description { margin: 0.75rem 0 0; line-height: 1.55; }

    @media (max-width: 560px) {
      .agenda { grid-template-columns: 1fr; }
      .event { grid-template-columns: 1fr; }
      .photo { height: 12rem; min-height: 0; }
      .details { padding: 1rem; }
    }
  `

  /** Events to display, in agenda order. */
  @property({attribute: false})
  events: AgendaEvent[] = []

  @state()
  private selectedEvent: AgendaEvent | null = null

  @query('dialog')
  private dialog!: HTMLDialogElement | null

  private async _selectEvent(event: AgendaEvent) {
    this.selectedEvent = event
    await this.updateComplete
    if (this.dialog && !this.dialog.open) this.dialog.showModal()
  }

  private _closeDialog() {
    this.dialog?.close()
  }

  private _onDialogClick(e: MouseEvent) {
    if (e.target === e.currentTarget) this._closeDialog()
  }

  private _onDialogClose() {
    this.selectedEvent = null
  }

  private formatDate(value: string): string {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit'
    }).format(date)
  }

  render() {
    const event = this.selectedEvent
    return html`<section class="agenda" aria-label="Event agenda">
      ${this.events.map((event) => html`
        <article class="event ${event.photo ? '' : 'no-photo'}">
          <button class="event-card" type="button" aria-label="View details for ${event.title}" @click=${() => this._selectEvent(event)}>
            ${event.photo
              ? html`<img class="photo" src=${event.photo} alt=${event.photoAlt ?? ''} loading="lazy">`
              : nothing}
            <div class="details">
              <h3 class="event-title">${event.title}</h3>
              <p class="meta">
                <span><span class="icon" aria-hidden="true">◷</span><time datetime=${event.datetime}>${this.formatDate(event.datetime)}</time></span>
                <span><span class="icon" aria-hidden="true">⌖</span>${event.location}</span>
              </p>
            </div>
          </button>
        </article>
      `)}
      <slot></slot>
    </section>
    <dialog class="detail-view" aria-label="Event details" @close=${this._onDialogClose} @click=${this._onDialogClick}>
      ${event ? html`
        <button class="back" type="button" aria-label="Close event details" autofocus @click=${this._closeDialog}>×</button>
        <h3>${event.title}</h3>
        <p class="meta">
          <span><span class="icon" aria-hidden="true">◷</span><time datetime=${event.datetime}>${this.formatDate(event.datetime)}</time></span>
          <span><span class="icon" aria-hidden="true">⌖</span>${event.location}</span>
        </p>
        ${event.description ? html`<p class="description">${event.description}</p>` : nothing}
        ${event.details ? html`<p class="description">${event.details}</p>` : nothing}
        ${event.address ? html`<p><strong>Address:</strong> ${event.address}</p>` : nothing}
        ${event.notes ? html`<p><strong>Good to know:</strong> ${event.notes}</p>` : nothing}
      ` : nothing}
    </dialog>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-event-agenda': EventAgenda
  }
}
