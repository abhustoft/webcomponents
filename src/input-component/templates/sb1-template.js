const sb1 = (label, placeholder, onChange) => {
    return `<style>.ffe-input-field {width: inherit}.clicked {background-color: khaki}</style>
    <label for="inputComp" class="ffe-form-label">${label}</label>
    <input id="inputComp" class="ffe-input-field" type="email" placeholder="${placeholder}" onchange=${onChange}>
    <h3 style="text-align: center">SB1 template</h3>
`
};
export default sb1;
