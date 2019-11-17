import {defaultTemplate, redTemplate} from './email-input.templates';

class EmailInput extends HTMLElement {
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

    connectedCallback() {
        this.render();
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

    render() {
        const {shadowRoot, template} = this;
        shadowRoot.innerHTML = '';
        const templateNode = document.getElementById(template);

        if (templateNode) {
            const content = document.importNode(templateNode.content, true);
            shadowRoot.appendChild(content);
        } else {
            if (template === 'red-template') {
                shadowRoot.innerHTML = redTemplate;
            } else {
                shadowRoot.innerHTML = defaultTemplate;
            }
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

customElements.define('email-input', EmailInput);
