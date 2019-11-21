const updateValue = (e) => {
    console.log('The app got this from the input:', e.target.value);
    firstInput.hasContent = 'yes';
};

const firstInput = document.querySelector('#first');
firstInput.hasContent = 'no';
setTimeout(() => {
    console.log('Read attribute \'hasContent\':', firstInput.hasContent)
}, 2000);
setTimeout(() => {
    firstInput.template = 'sb1';
}, 4000);
firstInput.addEventListener('input', updateValue);

const secInput = document.querySelector('#second');
secInput.hasContent = 'no';
secInput.textLike = true;
setTimeout(() => {
    secInput.template = 'sb1';
}, 4000);
secInput.addEventListener('input', updateValue);

const thirdInput = document.querySelector('#third');
thirdInput.hasContent = 'no';
thirdInput.textLike = true;
setTimeout(() => {
    thirdInput.template = 'sb1';
}, 4000);

thirdInput.addEventListener('input', updateValue);


const fourthInput = document.querySelector('#fourth');
fourthInput.hasContent = 'no';
fourthInput.textLike = true;
setTimeout(() => {
    fourthInput.template = 'sb1';
}, 4000);

fourthInput.addEventListener('input', updateValue);

