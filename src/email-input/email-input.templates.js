export const defaultTemplate = `<style>
        #emailInput {
            background: lightseagreen;
            border: 0;
            border-radius: 8px;
            color: white;
            font-family: Helvetica;
            font-size: 1rem;
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
    <h1 id="title"><slot name="heading"></slot></h1>
    <input id="emailInput" type="email" placeholder="Default template">
    <label for="emailInput">a label</label>
    <footer><slot></slot></footer>
`;

export const redTemplate = `<style>
        #emailInput {
            background: orangered;
            border: 0;
            border-radius: 8px;
            color: white;
            font-family: Helvetica;
            font-size: 1rem;
            padding: .5rem 1rem;
        }
        #emailInput.clicked {
            background: mediumslateblue;
        }
        label {
            border: 2px solid red;
            border-radius: 4px;
        }
    </style>
    <input id="emailInput" type="email" placeholder="Red template">
    <label for="emailInput">a label</label>
    <footer><slot></slot></footer>
`;
