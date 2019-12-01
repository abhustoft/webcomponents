const updateValue = e => {
    console.log('The app got this from the input:', e.target, e.target.value);
    firstInput.hasContent = 'yes';
};

const firstInput = document.querySelector('#first');
firstInput.hasContent = 'no';
setTimeout(() => {
    console.log(
        "Read attribute 'hasContent' of #first component:",
        firstInput.hasContent,
    );
}, 2000);
firstInput.addEventListener('input', updateValue);

const secInput = document.querySelector('#second');
secInput.hasContent = 'no';
secInput.textLike = true;
secInput.addEventListener('input', updateValue);

const thirdInput = document.querySelector('#third');
thirdInput.hasContent = 'no';
thirdInput.textLike = true;
thirdInput.addEventListener('input', updateValue);

const fourthInput = document.querySelector('#fourth');
fourthInput.hasContent = 'no';
fourthInput.textLike = true;
fourthInput.addEventListener('input', updateValue);

const button = document.querySelector('#changeTemplate');
button.onclick = () => {
    firstInput.template = firstInput.template === 'sb1' ? 'dnb' : 'sb1';
    secInput.template = secInput.template === 'sb1' ? 'dnb' : 'sb1';
    thirdInput.template = thirdInput.template === 'sb1' ? 'dnb' : 'sb1';
    fourthInput.template = fourthInput.template === 'sb1' ? 'dnb' : 'sb1';
};
