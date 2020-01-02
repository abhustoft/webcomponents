require('./input-component.less');
import style from './input-component.module.less';
import sb1 from './templates/sb1-template';
import dnb from './templates/dnb-template';

class InputComponent extends HTMLElement {
    static get observedAttributes() {
        return ['hasContent', 'template', 'textLike', 'inline', 'dark'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            switch (attrName) {
                case 'hasContent':
                    console.log('Changed hasContent:', newValue);
                    break;
                case 'template':
                    console.log('Changed template:', newValue);
                    break;
                case 'textLike':
                    console.log('Changed textLike:', newValue);
                    break;
                case 'inline':
                    console.log('Changed inline:', newValue);
                    break;
                case 'dark':
                    console.log('Changed dark:', newValue);
                    break;
            }
        }
    }

    get dark() {
        return this.attributes.getNamedItem('dark')
            ? this.attributes.getNamedItem('dark').nodeValue
            : null;
    }

    set dark(value) {
        if (value) {
            this.setAttribute('dark', value);
        } else {
            this.removeAttribute('dark');
        }
    }

    get inline() {
        return this.attributes.getNamedItem('inline')
            ? this.attributes.getNamedItem('inline').nodeValue
            : null;
    }

    set inline(value) {
        if (value) {
            this.setAttribute('inline', value);
        } else {
            this.removeAttribute('inline');
        }
    }

    get textLike() {
        return this.attributes.getNamedItem('textLike')
            ? this.attributes.getNamedItem('textLike').nodeValue
            : null;
    }

    set textLike(value) {
        if (value) {
            this.setAttribute('textLike', value);
        } else {
            this.removeAttribute('textLike');
        }
    }

    get hasContent() {
        return this.attributes.getNamedItem('hasContent').nodeValue;
    }

    set hasContent(value) {
        if (value) {
            this.setAttribute('hasContent', value);
        } else {
            this.removeAttribute('hasContent');
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
        //window.console.log('rendering')
        this.render();
    }

    render() {
        const {template, label, textLike, inline, dark} = this;
        const templateNode = document.getElementById(template);
        const placeholder = 'A placeholder';

        if (templateNode) {
            const hasContent = document.importNode(
                templateNode.content,
                true,
            );
            this.appendChild(hasContent);
        } else {
            if (template === 'sb1') {
                this.innerHTML = sb1(
                    label,
                    placeholder,
                    textLike,
                    inline,
                    dark,
                );
            } else {
                this.innerHTML = dnb(label, placeholder);
            }
        }

        const inputFromTemplate = document.getElementById('inputComp');
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
