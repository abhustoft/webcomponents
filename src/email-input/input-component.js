require('./input-component.less');
import style from './input-component.module.less';
import sb1 from './templates/sb1-template';
import dnb from './templates/dnb-template';

class InputComponent extends HTMLElement {
    static get observedAttributes() {
        return ['content', 'template'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            switch (attrName) {
                case 'content':
                    console.log('Changed content:', newValue);
                    break;
                case 'template':
                    console.log('Changed template:', newValue);
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

    get label() {
        return this.getAttribute('label');
    }

    set label(label) {
        if (label) {
            this.setAttribute('label', label);
        } else {
            this.removeAttribute('label');
        }
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const {template, label} = this;

        console.log('Render:', template, label);

        const templateNode = document.getElementById(template);
        const placeholder = 'A placeholder';

        if (templateNode) {
            const content = document.importNode(templateNode.content, true);
            this.appendChild(content);
        } else {
            if (template === 'sb1') {
                this.innerHTML = sb1(label, placeholder);
            } else {
                this.innerHTML = dnb(label, placeholder);
            }
        }

        const inputFromTemplate = document.getElementById('inputComp');
        inputFromTemplate.addEventListener('click', event => {
            inputFromTemplate.classList.add('clicked');
        });
    }

    disconnectedCallback() {
        // Clean up any event listeners, etc
    }
}

customElements.define('input-component', InputComponent);

const myInput = document.querySelector('input-component');
myInput.content = 'All empty';

setTimeout(() => {
    console.log("Read attribute 'content':", myInput.content);
}, 2000);

setTimeout(() => {
    myInput.template = 'sb1';
}, 4000);

const updateValue = e => {
    console.log('Input content:', e.target.value);
    myInput.content = 'Got some content';
};
myInput.addEventListener('input', updateValue);
