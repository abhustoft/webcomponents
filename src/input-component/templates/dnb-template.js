const dnb = (label, placeholder) => {
    return `

    <style>label {background-color: antiquewhite; display: inline-block; padding: 50px}</style>
    <div>
        <div>DNB template</div>
        <input name="dnb" type="email" placeholder="${placeholder}">
        <label for="dnb">${label}</label>
    </div>
`;
};
export default dnb;
