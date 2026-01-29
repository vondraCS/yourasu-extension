console.log("started.");
const checkboxes = document.querySelectorAll('.theme-checkbox');
const displayText = document.getElementById('chosen-theme-display');




checkboxes.forEach(async checkbox =>{
    console.log("test3");

    const savedValue = await chrome.storage.sync.get("Theme");
    const savedTheme = savedValue.Theme ?? 'default';

    if (checkbox.value == savedTheme){
        checkbox.checked = true;
        displayText.textContent = checkbox.dataset.label
    }

    console.log("test4");


    checkbox.addEventListener('change', function(){
        if (!this.checked){
            return;
        }

        checkboxes.forEach(box => {
            if (box !== this){
                box.checked = false;
            }
        })

        displayText.textContent = this.dataset.label
        chrome.storage.sync.set({"Theme": this.value});
        
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { theme: this.value });
        });
    })
})