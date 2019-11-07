'use strict';

class OneDialog extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
    }

    constructor() {
        super();
        this.close = this.close.bind(this);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[attrName] = this.hasAttribute(attrName);
        }
    }

    connectedCallback() {
        // const template = document.getElementsByTagName("link")[0].import;
        // console.log(document.getElementsByTagName("link"));

        const template = document.getElementById('dialog-template');
        const node = document.importNode(template.content, true);
        this.appendChild(node);


        this.querySelector('button').addEventListener('click', this.close);
        this.querySelector('.overlay').addEventListener('click', this.close);
        this.open = this.open;
    }

    disconnectedCallback() {
        this.querySelector('button').removeEventListener('click', this.close);
        this.querySelector('.overlay').removeEventListener('click', this.close);
    }


    get open() {
        return this.hasAttribute('open');
    }


    set open(isOpen) {
        this.querySelector('.wrapper').classList.toggle('open', isOpen);
        this.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            this._wasFocused = document.activeElement;
            this.setAttribute('open', '');
            document.addEventListener('keydown', this._watchEscape);
            this.focus();
            this.querySelector('button').focus();
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
