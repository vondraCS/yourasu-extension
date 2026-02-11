console.log("started.");
const themeRadios = document.querySelectorAll('.theme-radio');
const displayText = document.getElementById('chosen-theme-display');
//const themeSlots = document.querySelectorAll('.theme-slot')
const backgroundRadioInputs = document.querySelectorAll('#background-color-radio, #background-url-radio');
//const customMap = new Map;
const customizationObject = {};
const backgroundColorInput = document.getElementById('background-color-input');
const backgroundUrlInput = document.getElementById('background-url-input');
const allInputs = document.querySelectorAll('.range-input, .color-input, .url-input');
//const colorInputs = document.querySelectorAll('.color-input');

/*
let lastTheme;

console.log("test");
themeSlots.forEach(async slot => {
    console.log('running async')
    slot.addEventListener('click', () => {
        console.log(slot);
        console.log("Ran!!!!!!!!!!!");
        this.classList.add('theme-active');

        if(lastTheme){
            lastTheme.classList.remove('theme-active');
            lastTheme = this;
        }
    });
});*/

function sendMsgToTab(value){
    console.log('sending msg')
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, value);
        });
}

function setMapValue(key, value){
    customizationObject[key] = value;
    sendMsgToTab(customizationObject);
}

let ticked = 'none';//which one is active

//adds listeners to the radio buttons of the background customization section, since it can only show either the color or the image
backgroundRadioInputs.forEach(async radio => {
    console.log("starting async")
    radio.addEventListener('input', function(){
        if(!this.checked){
            return;
        }

        ticked = this.id;
        
        console.log("RADIO!!!")
        switch(this.id){
            case 'background-color-radio':
                setMapValue('background', backgroundColorInput.value);
                break;
            case 'background-url-radio':
                setMapValue('background', backgroundUrlInput.value);
                break;
        }
    })
});


allInputs.forEach(async input =>{
    console.log("setting up inputs...")
    input.addEventListener('input', function(){
        console.log(this.id);
        console.log(this.value);
        //chck to make sure its ticked before updating the dom
        if(this.id  !== ticked && (this.id == 'background-color-radio' || this.id == 'background-url-radio') ){
            return;
        }
        setMapValue(this.id, this.value);
    });
});

console.log("test2")

themeRadios.forEach(async radio =>{
    console.log("test3");
    const savedValue = await chrome.storage.sync.get("Theme");
    const savedTheme = savedValue.Theme ?? 'default';

    if (radio.value == savedTheme){
        radio.checked = true;
        displayText.textContent = radio.dataset.label
    }


    radio.addEventListener('change', function(){
        if (!this.checked){
            return;
        }

        displayText.textContent = this.dataset.label
        chrome.storage.sync.set({"Theme": this.value});
        
        sendMsgToTab({theme: this.value});
    })
})

