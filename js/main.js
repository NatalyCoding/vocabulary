const engWord = document.getElementById('eng'),
    polWord = document.getElementById('pol'),
    inputs = document.getElementsByClassName('input'),
    addButton = document.getElementById('add-word-btn'),
    table = document.getElementById('table');

let words,
    btnsDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = index => {
    table.innerHTML += `
        <tr class="tr">
            <td class="pol-word">${words[index].polish}</td>
            <td class="eng-word">${words[index].english}</td>
            <td>
                <button class="btn-delete"></button>
            </td>
        </tr>
    `
}

words.forEach((element, i) => {
    addWordToTable(i);
})

function CreateWord(polish, english) {
    this.polish = polish;
    this.english = english;
}


addButton.addEventListener('click', () => {
    if (
        engWord.value.length < 1 ||
        polWord.value.length < 1 ||
        !isNaN(engWord.value) ||
        !isNaN(polWord.value)
    ) {
        for (let key of inputs) {
            key.classList.add('error');
        }

    } else {
        for (let key of inputs) {
            key.classList.remove('error');
        }
        words.push(new CreateWord(polWord.value, engWord.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        polWord.value = null;
        engWord.value = null;
        addEventDelete();
    }
});

const deleteWord = el => {
    const rowIndex = el.target.parentNode.parentNode.rowIndex;
    el.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
}

const addEventDelete = () => {
    if (words.length > 0) {
        btnsDelete = document.querySelectorAll('.btn-delete');
        for (let btn of btnsDelete) {
            btn.addEventListener('click', el => {
                deleteWord(el);
            })
        }
    }
}

addEventDelete();