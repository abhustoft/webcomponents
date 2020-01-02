class BoilerHTMLElement extends HTMLElement {
    constructor() {
        super();
        // Check to see if observedAttributes are defined and has length
        if (this.constructor.observedAttributes && this.constructor.observedAttributes.length) {
            // Loop through the observed attributes
            this.constructor.observedAttributes.forEach(attribute => {
                // Dynamically define the property getter/setter
                Object.defineProperty(this, attribute, {
                    get() { return this.getAttribute(attribute); },
                    set(attrValue) {
                        window.console.log('BoilerHTMLElement setting:', attribute, attrValue);
                        if (attrValue) {
                            this.setAttribute(attribute, attrValue);
                            this.render();
                        } else {
                            this.removeAttribute(attribute);
                        }
                    }
                })
            });
        }
    }
}
export default BoilerHTMLElement;
