
// --------- Custom element -------------------------------------------------------------

class EmailInput extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<input placeholder="custom element">`;
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
<input id="shadowInput" placeholder="shadow"><slot></slot> after slot</input>`;


// --------- HTML template ----------------------------------------------------------------

const emailFragment = document.getElementById('email-template');
const emailInstance = document.importNode(emailFragment.content, true);
emailInstance.querySelector('label').innerHTML = 'the label text';
document.getElementById('emailID').appendChild(emailInstance);

// ----------------------------------------------------------------------------------------