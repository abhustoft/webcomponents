import classNames from 'classnames';

const sb1 = (label, placeholder, textLike, inline, dark) => {
    const className = classNames(
        'ffe-input-field',
        {'ffe-input-field--inline': inline},
        {'ffe-input-field--text-like': textLike},
        {'ffe-input-field--dark': dark},
    );

    return `<style>.ffe-input-field {width: inherit}.clicked {background-color: khaki}</style>
    <label for="sb1" class="ffe-form-label">${label}</label>
    <input name="sb1" class="${className}" type="email" placeholder="${placeholder}">
    <h3 style="text-align: center">SB1 template</h3>
    `;
};

export default sb1;
