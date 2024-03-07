let getButton = document.getElementsByClassName('btn')[0];
let getInput = document.getElementsByClassName('input')[0];
let getDictionary = document.getElementsByClassName('dictionary')[0];

let inputValue;
let inputValueTranslit;
let newWord;
let array = [];

let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";

// Добавление слов в словарь по кнопке
getButton.addEventListener('click', function (event) {
    
    inputValue = getInput.value.trim();

    if (inputValue !== "") {

        if (checkInputIncludeEng(str, inputValue)) {
            getInput.value = "";
            return alert('Пожалуйста, используйте кириллицу');
        } else {

            let newInputValue = "";
        
            let translitInputValue = inputValue;

            let dataTooltipRus = "";
        
            if (inputValue.length > 7) {
                newInputValue = inputValue;
                inputValue = inputValue.substring(0,7) + '...';
                dataTooltipRus = `data-tooltip="${newInputValue}"`
            } 
        
            array.push(inputValue);
        
            let newInputValueTranslit = translitRusEng(translitInputValue);

            let dataTooltipEng = "";
        
            if (inputValueTranslit.length > 7) {
                newInputValueTranslit = inputValueTranslit;
                inputValueTranslit = inputValueTranslit.substring(0,7) + '...';
                dataTooltipEng = `data-tooltip="${newInputValueTranslit}"`
            } 
        
            newWord = document.createElement('div');
            newWord.setAttribute("class", "wordNew");
            newWord.setAttribute("style", "border-top: 1px solid black");
        
            newWord.innerHTML =
                `<div class="leftBlock-Rus">
                    <div class="numberNew">${array.length+1}</div>
                    <div class="rusWord" ${dataTooltipRus}>
                        ${inputValue}
                    </div>
                </div>
                <div class="rightBlock-Eng-new">
                    <div class="engWord" ${dataTooltipEng}>
                        ${inputValueTranslit}
                    </div>
                    <button class="btnDelete"><img class="imgDelete" src="./icons/Group 1.svg" alt="Крестик"></button>
                </div>`
            getDictionary.append(newWord);
        
            updateNumber();
        
            getInput.value = "";
        }
    }
});

// Добавление слов в словарь по нажатию Enter
getInput.addEventListener('keydown', function (event) {

    if (event.keyCode === 13) {
        inputValue = getInput.value.trim();

        if (inputValue !== "") {

            if (checkInputIncludeEng(str, inputValue)) {
                getInput.value = "";
                return alert('Пожалуйста, используйте кириллицу');
            } else {

                let newInputValue = "";
            
                let translitInputValue = inputValue;

                let dataTooltipRus = "";
            
                if (inputValue.length > 7) {
                    newInputValue = inputValue;
                    inputValue = inputValue.substring(0,7) + '...';
                    dataTooltipRus = `data-tooltip="${newInputValue}"`
                } 
            
                array.push(inputValue);
            
                let newInputValueTranslit = translitRusEng(translitInputValue);

                let dataTooltipEng = "";
            
                if (inputValueTranslit.length > 7) {
                    newInputValueTranslit = inputValueTranslit;
                    inputValueTranslit = inputValueTranslit.substring(0,7) + '...';
                    dataTooltipEng = `data-tooltip="${newInputValueTranslit}"`
                } 
            
                newWord = document.createElement('div');
                newWord.setAttribute("class", "wordNew");
                newWord.setAttribute("style", "border-top: 1px solid black");
            
                newWord.innerHTML =
                `<div class="leftBlock-Rus">
                    <div class="numberNew">${array.length+1}</div>
                    <div class="rusWord" ${dataTooltipRus}>
                        ${inputValue}
                    </div>
                </div>
                <div class="rightBlock-Eng-new">
                    <div class="engWord" ${dataTooltipEng}>
                        ${inputValueTranslit}
                    </div>
                    <button class="btnDelete"><img class="imgDelete" src="./icons/Group 1.svg" alt="Крестик"></button>
                </div>`
                getDictionary.append(newWord);
            
                updateNumber();
            
                getInput.value = "";
            }
        }
    }
});


// Функция транслит
function translitRusEng(inputValue) {
    const arrayListTranslit = [["а", "a"], ["б", "b"], ["в", "v"], ["г", "g"], ["д", "d"], ["е", "e"], ["ё", "e"]
    , ["ж", "zh"], ["з", "z"], ["и", "i"], ["й", "j"], ["к", "k"], ["л", "l"], ["м", "m"], ["н", "n"], ["о", "o"], ["п", "p"]
    , ["р", "r"], ["с", "s"], ["т", "t"], ["у", "u"], ["ф", "f"], ["х", "h"], ["ц", "c"], ["ч", "ch"], ["ш", "sh"], ["щ", "shh"]
    , ["ъ", "''"], ["ы", "y'"], ["ь", "'"], ["э", "e"], ["ю", "yu"], ["я", "ya"]
    , ["А", "A"], ["Б", "B"], ["В", "V"], ["Г", "G"], ["Д", "D"], ["Е", "E"], ["Ё", "E"]
    , ["Ж", "ZH"], ["З", "Z"], ["И", "I"], ["Й", "J"], ["К", "K"], ["Л", "L"], ["М", "M"], ["Н", "N"], ["О", "O"], ["П", "P"]
    , ["Р", "R"], ["С", "S"], ["Т", "T"], ["У", "U"], ["Ф", "F"], ["Х", "H"], ["Ц", "C"], ["Ч", "CH"], ["Ш", "SH"], ["Щ", "SHH"]
    , ["Ъ", "''"], ["Ы", "Y'"], ["Ь", "'"], ["Э", "E"], ["Ю", "YU"], ["Я", "YA"]
    , [" ", " "], ["?", "?"], ["!", "!"], [",", ","], [".", "."], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]
    , ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["-", "-"]];

    function getEngLitter(rusLitter) {
        let sss = arrayListTranslit.find(i=>i[0]===rusLitter);
        return sss != undefined ? sss[1] : "" ;
    }

    inputValueTranslit = inputValue.split("").map(getEngLitter).join("");

    return inputValueTranslit;
};

// Функция для удаления строк
let getDictionaryWords = document.getElementById('dictionary-id');
getDictionaryWords.addEventListener('click', function(event) {
    if(event.target.className === "imgDelete") {
        let deleteString = event.target.parentNode.parentNode.parentNode;
        deleteString.remove();
        updateNumber();
    }
});

// Функция для удаления всего
let getDeleteAllButton = document.getElementsByClassName('deleteAllButton')[0];
getDeleteAllButton.addEventListener('click', function(event) {
    let deleteNewWord = document.querySelectorAll('.wordNew');
    deleteNewWord.forEach(function (element) {
        element.remove();
    })
})

// Функция для обновления индексов строк
let countNumber = Number(document.querySelector('.number').innerText);
function updateNumber() {
    let dictionaryWords = document.querySelectorAll('.numberNew');
    for (let i=0; i < dictionaryWords.length; i++) {
        dictionaryWords[i].innerText = i+2;
    }
}

// Функция для проверки латиницы в input
  function checkInputIncludeEng(str, inputValue) {
    // Преобразуем строки в массивы символов
    const strArray = str.split("");
    const inputValueArray = inputValue.split("");
  
    // Проверяем, содержатся ли все элементы inputValueArray в strArray
    for (const char of inputValueArray) {
      if (!strArray.includes(char)) {
        return false;
      }
    }
    return true;
  }