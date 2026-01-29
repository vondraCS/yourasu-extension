chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.theme) {
        CustomizeSite(msg.theme);
    }
});

chrome.storage.sync.get("Theme", ({ Theme }) => {
    CustomizeSite(Theme ?? 'default', true);
});

function CustomizeSite(theme, first_ran){
    console.log("test");

    if (!document.body) return;

    console.log("test2");

    //if first time running, save the default stuff

    const background = document.getElementById('myasu-main-content');
    //const headerElements = [document.getElementById('#myasu-header-top'), document.getElementById('headerContainer')];
    document.getElementById('#myasu-header-top').style.background = null;
    document.getElementById('headerContainer').style.background = null;

    
    //let defaultBG;
    if (first_ran){
        //defaultBG = background.style.background
    }

    switch(theme){
        case 'default':
            //background.style.background = defaultBG;
            background.style.backgroundColor = '';

            break;
        case 'dark-mode':
            background.style.background = 'none';
            background.style.backgroundColor = '#000000';
           

            const header = document.getElementsByClassName('.css-10dnl2k');

            header.forEach((el) => {
                el.style.background = null;
                el.style.backgroundColor = '#384989';
            });

            console.log(h);
            h.style.backgroundColor = '#454982'
            break;
    }
}