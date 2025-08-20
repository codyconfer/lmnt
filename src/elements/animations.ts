import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("typing-animation")
export class TypingAnimation extends LitElement {
  static styles = css`
    .typewriter {
      width: fit-content;
    }
  `;

  render() {
    return html`
      <div class="typewriter">
      </div>
    `;
  }
}

@customElement("cursor-animation")
export class CursorAnimation extends LitElement {
  static styles = css`
    @keyframes blink-cursor {
      from, to {
        border-color: transparent;
      }
      50% {
        border-color: var(--accent-0);
      }
    }

    .cursor {
      width: fit-content;
      height: fit-content;
      border-right: 0.15em solid var(--accent-0);
      white-space: nowrap;
      margin: 0;
      animation: blink-cursor 1s step-end infinite;
    }
  `;

  render() {
    return html`
      <div class="cursor">
        <slot></slot>
      </div>
    `;
  }
}

@customElement("blink-animation")
export class BlinkAnimation extends LitElement {
  static styles = css`
    @keyframes blink {
      from, to {
        color: transparent;
      }
      50% {
        color: var(--accent-0);
      }
    }

    .blink {
      display: inline-block;
      width: fit-content;
      color: var(--accent-0);
      animation: blink 1s step-end infinite;
    }
  `;

  render() {
    return html`
      <div class="blink">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "typing-animation": TypingAnimation;
    "cursor-animation": CursorAnimation;
  }
}
