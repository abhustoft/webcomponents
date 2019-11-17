
const myInput = document.querySelector('email-input');
myInput.content = 'All empty';

setTimeout(() => {
    console.log('Read attribute \'content\':', myInput.content)
}, 2000)


setTimeout(() => {
    myInput.template = 'internal';
}, 4000);

setTimeout(() => {
    myInput.template = 'bare-template';
}, 6000);

setTimeout(() => {
    myInput.template = 'red-template';
}, 8000);

const updateValue = (e) => {
    console.log('Input content:', e.target.shadowRoot.activeElement.value);
    myInput.content = 'Got some content';
};
myInput.addEventListener('input', updateValue);

