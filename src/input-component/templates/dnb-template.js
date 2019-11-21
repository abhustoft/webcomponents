const sb1 = (label, placeholder) => {
    return `

    <style>label {background-color: antiquewhite; display: inline-block; padding: 50px}</style>
    <div>
        <div>DNB template</div>
        <input id="inputComp" type="email" placeholder="${placeholder}">
        <label for="inputComp">${label}</label>
    </div>
`
};
export default sb1;
