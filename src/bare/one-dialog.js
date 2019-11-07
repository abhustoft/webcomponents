'use strict';
import * as style from './one-dialog.module.less';

class OneDialog extends HTMLElement {
    static get observedAttributes() {
        return ['open', 'template'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.close = this.close.bind(this);
        console.log(style, window.getComputedStyle(this));
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            switch (attrName) {
                /** Boolean attributes */
                case 'open':
                    this[attrName] = this.hasAttribute(attrName);
                    break;
                /** Value attributes */
                case 'template':
                    this[attrName] = newValue;
                    break;
            }
        }
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click', this.close);
        this.shadowRoot.querySelector('.overlay').removeEventListener('click', this.close);
    }

    render() {

        const { shadowRoot, template } = this;
        const templateNode = document.getElementById(template);
        if (templateNode) {
            const content = document.importNode(templateNode.content, true);
            shadowRoot.appendChild(content);
        } else {
            shadowRoot.innerHTML = `
      <div class="wrapper">
      <div class="overlay"></div>
        <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
          <button class="close" aria-label="Close">✖️</button>
          <h1 id="title"><slot name="heading"></slot></h1>
          <div id="content" class="content">
            <div class="myborder">
                <slot></slot>
            </div>
          </div>
        </div>
      </div>`;
        }

        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'one-dialog.css');
        shadowRoot.appendChild(link);

        shadowRoot.querySelector('button').addEventListener('click', this.close);
        shadowRoot.querySelector('.overlay').addEventListener('click', this.close);
        this.open = this.open;
    }

    get open() {
        return this.hasAttribute('open');
    }

    get template() {
        return this.getAttribute('template');
    }


    set template(template) {
        if (template) {
            this.setAttribute('template', template);
        } else {
            this.removeAttribute('template');
        }
        this.render();
    }

    set open(isOpen) {
        const { shadowRoot } = this;
        shadowRoot.querySelector('.wrapper').classList.toggle('open', isOpen);
        shadowRoot.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            this._wasFocused = document.activeElement;
            this.setAttribute('open', '');
            document.addEventListener('keydown', this._watchEscape);
            this.focus();
            shadowRoot.querySelector('button').focus();
        } else {
            this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
            this.removeAttribute('open');
            document.removeEventListener('keydown', this._watchEscape);
            this.close();
        }
    }


    close() {
        if (this.open !== false) {
            this.open = false;
        }
        const closeEvent = new CustomEvent('dialog-closed');
        this.dispatchEvent(closeEvent);
    }

    _watchEscape(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
}

customElements.define('one-dialog', OneDialog);

const button = document.getElementById('launch-dialog');
button.addEventListener('click', () => {
    document.querySelector('one-dialog').open = true;
});
