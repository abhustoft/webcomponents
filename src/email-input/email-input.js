// --------- Custom element -------------------------------------------------------------

class EmailInput extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<input placeholder="custom element" id="customInput"><label for="customInput">label</label>`;
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