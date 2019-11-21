const template = () => {
    return `<style>
        #emailInput {
            background: tomato;
            border: 0;
            border-radius: 4px;
            color: white;
            font-family: Helvetica;
            font-size: 1.5rem;
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
    <input id="emailInput" type="email" placeholder="a template">
    <label for="emailInput">a label</label>`
};
export default template;
