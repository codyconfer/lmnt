import {css, html, LitElement} from 'lit'
import {customElement, state} from 'lit/decorators.js'
import {baseStyles} from '@elements/styles.ts'


export const THEME_KEY = 'lmnt-theme'
export const THEME_LINK_ID = 'lmnt-theme'

export const THEMES = [
  {file: 'pastel-90s', label: 'pastel 90s'},
  {file: 'sherbet', label: 'sherbet'},
  {file: 'dusty-rose', label: 'dusty rose'},
  {file: 'peach-indigo', label: 'peach indigo'},
  {file: 'solarized', label: 'solarized'},
  {file: 'vivid-one-dark', label: 'one dark'}
] as const

export type ThemeFile = typeof THEMES[number]['file']

function savedTheme(): ThemeFile {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    const known = THEMES.find(t => t.file === saved)
    if (known) return known.file
  } catch {
    /* storage unavailable; fall through to the default */
  }
  return THEMES[0].file
}

@customElement('lmnt-theme-switcher')
export class ThemeSwitcher extends LitElement {
  static styles = [
    baseStyles,
    css`
      select {
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--muted-2);
        border-radius: 0.25rem;
        background-color: var(--background-1);
        color: var(--foreground-0);
        font-family: var(--mono-font), monospace;
        font-size: 0.7rem;
        cursor: pointer;
      }

      select:hover {
        border-color: var(--highlight-1);
      }

      select:focus-visible {
        outline: 2px solid var(--highlight-1);
        outline-offset: 2px;
      }
    `
  ]

  @state()
  private _theme: ThemeFile = savedTheme()

  connectedCallback() {
    super.connectedCallback()
    /* the inline script in index.html may have swapped the theme before first paint;
       bring the theme-color meta in line once that stylesheet is in effect */
    const link = document.getElementById(THEME_LINK_ID)
    if (link instanceof HTMLLinkElement && !link.sheet) {
      link.addEventListener('load', () => this._syncThemeColor(), {once: true})
    } else {
      this._syncThemeColor()
    }
  }

  /* reading the computed background (rather than keeping a hex per theme here) keeps
     the meta honest even for themes with prefers-color-scheme overrides */
  private _syncThemeColor() {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!(meta instanceof HTMLMetaElement)) return
    meta.content = getComputedStyle(document.documentElement).backgroundColor
  }

  private _onChange(e: Event) {
    const theme = (e.target as HTMLSelectElement).value as ThemeFile
    this._theme = theme
    /* the link lives in the document head so the theme applies outside any shadow root;
       the inline script in index.html restores it before first paint */
    const link = document.getElementById(THEME_LINK_ID)
    if (link instanceof HTMLLinkElement) {
      link.addEventListener('load', () => this._syncThemeColor(), {once: true})
      link.href = `/lib/theme/${theme}.css`
    }
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* storage unavailable; the pick still applies for this visit */
    }
  }

  render() {
    return html`
      <select aria-label="color theme" @change=${this._onChange}>
        ${THEMES.map(t => html`
          <option value="${t.file}" ?selected=${t.file === this._theme}>${t.label}</option>
        `)}
      </select>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lmnt-theme-switcher': ThemeSwitcher
  }
}
