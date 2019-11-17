// --------- Custom element -------------------------------------------------------------

class EmailInput extends HTMLElement {
    static get observedAttributes() {
        return ['content'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('attributeChangedCallback:', attrName, oldValue, newValue)
    }

    get content() {
        return this.attributes.getNamedItem('content').nodeValue;
    }

    set content(value) {
        if (value) {
            this.setAttribute('content', value);
        } else {
            this.removeAttribute('content');
        }
    }

    connectedCallback() {
        const template = document.getElementById('email-template');
        const node = document.importNode(template.content, true);
        this.appendChild(node);
    }
}
customElements.define('email-input', EmailInput);

const myInput = document.querySelector('email-input');
myInput.content = 'All empty';

setTimeout(() =>{console.log('Read attribute \'content\':',myInput.content)}, 3000)


const updateValue = (e) => {
   console.log('Input content:',e.target.value);
   myInput.content = 'Got some content';
};
myInput.addEventListener('input', updateValue);


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

// const emailFragment = document.getElementById('email-template');
// const emailInstance = document.importNode(emailFragment.content, true);
// emailInstance.querySelector('label').innerHTML = 'the label text';
// document.getElementById('emailID').appendChild(emailInstance);

// ----------------------------------------------------------------------------------------