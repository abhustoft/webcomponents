const myInput = document.querySelector('input-component');
myInput.content = 'All empty';

setTimeout(() => {
    console.log('Read attribute \'content\':', myInput.content)
}, 2000);


setTimeout(() => {
    myInput.template = 'sb1';
}, 4000);


const updateValue = (e) => {
    console.log('The app got this from the input:', e.target.value);
    myInput.content = 'Got some content';
};

myInput.addEventListener('input', updateValue);

