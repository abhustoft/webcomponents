import * as shtmp from './templates/shadow-template';

class EmailInputShadow extends HTMLElement {
    static get observedAttributes() {
        return ['content', 'template'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        //this.close = this.close.bind(this);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            switch (attrName) {
                case 'content':
                    console.log('Changed content:', newValue)
                    break;
                case 'template':
                    console.log('Changed template:', newValue)
                    break;
            }
        }
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

    connectedCallback() {
        this.render();
    }

    render() {
        const {shadowRoot, template} = this;
        shadowRoot.innerHTML = '';
        const templateNode = document.getElementById(template);
        if (templateNode) {
            const content = document.importNode(templateNode.content, true);
            shadowRoot.appendChild(content);
        } else {
            shadowRoot.innerHTML = `<style>
        #emailInput {
            background: lightsteelblue;
            border: 0;
            border-radius: 8px;
            color: white;
            font-family: Helvetica;
            font-size: 1rem;
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
    <h1 id="title"><slot name="heading"></slot></h1>
    <input id="emailInput" type="email" placeholder="a template">
    <label for="emailInput">a label</label>
    <footer><slot></slot></footer>
`;
        }

        const inputFromTemplate = shadowRoot.getElementById('emailInput');
        inputFromTemplate.addEventListener('click', event => {
            inputFromTemplate.classList.add('clicked');
        });

    }

    disconnectedCallback() {
        // Clean up any event listeners, etc
    }
}

customElements.define('email-input-shadow', EmailInputShadow);

const myInput = document.querySelector('email-input-shadow');
if (myInput) {
    myInput.content = 'All empty';
}

 // setTimeout(() => {
 //     console.log('Read attribute \'content\':', firstInput.content)
 // }, 2000)
 //

//setTimeout(() => {
if (myInput) {
    myInput.template = 'internal';
}
//}, 4000)



const updateValue = (e) => {
    console.log('Input content:', e.target.shadowRoot.activeElement.value);
    myInput.content = 'Got some content';
};
if (myInput) {
    myInput.addEventListener('input', updateValue);
}

