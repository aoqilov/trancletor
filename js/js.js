let selectTag = document.querySelectorAll('select');
let button = document.querySelector('button')
let textFrom =document.querySelector('#enter')
let textTo =document.querySelector('#translate')
let exchange = document.querySelector('#exchange')
let volume = document.querySelectorAll('.icons i')

//select
 
selectTag.forEach((tag,id) =>{
    for(let c_Code in countries){
        let selected;
        if(id == 0 && c_Code == "en-GB"){
            selected = "selected"
        } else if(id == 1 && c_Code == "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${c_Code} ${selected}">${c_Code, countries[c_Code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);

    }
})

// btn eexchange

exchange.addEventListener('click', ()=>{
    let tempText = textFrom.value``
    let tempLang = selectTag[1].value
    textFrom.value = textTo.value
    selectTag[1].value = selectTag[0].value
    textTo.value = tempText
    selectTag[0].value = tempLang
    
})


// btn translate
button.addEventListener("click", ()=>{
    let text = textFrom.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    console.log(text, translateFrom, translateTo);
    let API = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`
    fetch(API).then(result => result.json()).then( data =>{
    console.log(data);
        textTo.value = data.responseData.translatedText
    } )
})

// btn volume

volume.forEach(icon =>{
    icon.addEventListener('click', ({target}) => {
        if(target.classList.contains('fa-copy')){

            if(target.id == 'from'){
                navigator.clipboard.writeText(textFrom.value)
            }
            else(navigator.clipboard.writeText(textTo.value))
        } else {
            let uterace;
            if( target.id == 'from'){
                uterace = new SpeechSynthesisUtterance(textFrom.value)
                uterace.lang = selectTag[0].value

            }else {
                uterace = new SpeechSynthesisUtterance(textTo.value)
                uterace.lang = selectTag[1].value

        } speechSynthesis.speak(uterace)
        }

    })
})

