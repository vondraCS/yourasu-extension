
const checkboxes = document.querySelectorAll('.theme-checkbox');
const displayText = document.getElementById('chosen-theme-display');



checkboxes.forEach(async checkbox =>{
    const savedValue= await chrome.storage.sync.get("Theme");
    console.log(savedValue);
    const savedTheme = savedValue.Theme;

    if (checkbox.value == savedTheme){
        checkbox.checked = true;
        displayText.textContent = checkbox.dataset.label
    }

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

        chrome.storage.sync.set({"Theme": checkbox.value});
    })
})