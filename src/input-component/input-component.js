require('./input-component.less');
import BoilerHTMLElement from '../boiler-html-element/boiler-html-element';
import sb1 from './templates/sb1-template';
import dnb from './templates/dnb-template';

class InputComponent extends BoilerHTMLElement {
    static get observedAttributes() {
        return [
            'hasContent',
            'template',
            'textLike',
            'inline',
            'dark',
            'placeholder',
        ];
    }

    connectedCallback() {
        //window.console.log('rendering')
        this.render();
    }

    render() {
        const {template, label, textLike, inline, dark, placeholder} = this;
        window.console.log('render with label:', template, label, textLike, inline, dark, placeholder)
        const templateNode = document.getElementById(template);
        const _placeholder = placeholder ? placeholder : 'A placeholder';

        if (templateNode) {
            const node = document.importNode(templateNode.content, true);
            this.appendChild(node);
        } else {
            if (template === 'sb1') {
                this.innerHTML = sb1(
                    label,
                    _placeholder,
                    textLike,
                    inline,
                    dark,
                );
            } else {
                this.innerHTML = dnb(label, _placeholder);
            }
        }

        const inputFromTemplate = this.querySelector('input');
        if (inputFromTemplate) {
            inputFromTemplate.addEventListener('click', event => {
                inputFromTemplate.classList.add('clicked');
            });
        }
    }

    disconnectedCallback() {
        // Clean up any event listeners, etc
        console.log('Clean up!');
    }
}

customElements.define('input-component', InputComponent);
