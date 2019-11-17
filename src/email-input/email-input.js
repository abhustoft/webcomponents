class EmailInput extends HTMLElement {
    static get observedAttributes() {
        return ['content'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        //this.close = this.close.bind(this);
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
        const {shadowRoot} = this;
        shadowRoot.innerHTML = `<style>
        #emailInput {
            background: tomato;
            border: 0;
            border-radius: 4px;
            color: white;
            font-family: Helvetica;
            font-size: 1.5rem;
            padding: .5rem 1rem;
        }
        #emailInput.clicked {
            background: mediumslateblue;
        }
        label {
            border: 2px solid green;
            border-radius: 4px;
        }
    </style>
    <input id="emailInput" type="email" placeholder="a template">
    <label for="emailInput">a label</label>`;

        const inputFromTemplate = shadowRoot.getElementById('emailInput');
        inputFromTemplate.addEventListener('click', event => {
            inputFromTemplate.classList.add('clicked');
        });

    }

    disconnectedCallback() {
        // Clean up any event listeners, etc
    }
}

customElements.define('email-input', EmailInput);

const myInput = document.querySelector('email-input');
myInput.content = 'All empty';

setTimeout(() => {
    console.log('Read attribute \'content\':', myInput.content)
}, 3000)


const updateValue = (e) => {
    console.log('Input content:', e.target.shadowRoot.activeElement.value);
    myInput.content = 'Got some content';
};
myInput.addEventListener('input', updateValue);

