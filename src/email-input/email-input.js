// --------- Custom element -------------------------------------------------------------

class EmailInput extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('attributeChangedCallback:', attrName, oldValue, newValue)
        if (newValue !== oldValue) {
            this[attrName] = this.hasAttribute(attrName);
        }
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(isOpen) {
        if (isOpen) {
            this.setAttribute('open', true);
        } else {
            this.removeAttribute('open');
        }
    }
    
    connectedCallback() {
        const template = document.getElementById('email-template');
        const node = document.importNode(template.content, true);
        this.appendChild(node);
    }
}
customElements.define('email-input', EmailInput);

// --------- Shadow root ----------------------------------------------------------------
const shadowRoot = document.getElementById('emailShadow').attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `<style>
shadowInput {
  background: tomato;
  color: white;
}
</style>
<input id="shadowInput" placeholder="shadow">
<label for="shadowInput"><slot></slot> After slot</label>`;


// --------- HTML template ----------------------------------------------------------------

const emailFragment = document.getElementById('email-template');
const emailInstance = document.importNode(emailFragment.content, true);
emailInstance.querySelector('label').innerHTML = 'the label text';
document.getElementById('emailID').appendChild(emailInstance);

// ----------------------------------------------------------------------------------------