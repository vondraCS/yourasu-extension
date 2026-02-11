let currentTheme;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("msg received")
    if(msg.theme) {
        currentTheme = msg.theme;
        CustomizeSite(currentTheme, false);
    }else{
        updateCustomValues(msg);
    }

});

chrome.storage.sync.get("Theme", ({ Theme }) => {
    currentTheme = Theme ?? 'default';
    loadFirstTime(currentTheme);
});

let headerMain;
let headerElements;
let headerFonts;
let navBar;
let background;
let boxElements;
let boxMain;
let bodyFonts;
let bodyFonts2;
let highlightedText;
let highlightedElements;
let animatedUnderline;
let icons;
let quickLinks;
let hoverElements;
let quickLinkIcons;
let announcementBanner;

function initDomRefs() {
    headerMain = document.querySelector('#headerContainer');
    headerElements = document.querySelectorAll('.css-10dnl2k, .css-10dnl2k .navbar-component, #myasu-header-top');
    headerFonts = document.querySelectorAll('.css-10dnl2k nav.header-nav .navlist > li > a');
    navBar = document.querySelectorAll('.css-10dnl2k .universal-nav');
    background = document.getElementById('myasu-main-content');
    boxElements = document.querySelectorAll('.box .box-title-bar, .box-content, .fa-sap-details-container, #agenda-header, .agenda-item, .fa-sap-table .sap-details, .fa-awards-table>tbody, .fa-awards-table>tfoot, table.alternating>tbody>tr:nth-child(even), .fa-awards-table>tfoot, table.fa-awards-table>tbody>tr.award-details, .box-drawer-body-2020, table.renewable-aid-table>tbody>tr.renewable-aid-details, .box-tabs, #docket, .box-footer, #agenda-header, .agenda-item, #agenda-footer');
    boxMain = document.querySelectorAll('.box, .graybg, table.fa-awards-table>tbody>tr.award-details>td');
    titleFonts = document.querySelectorAll('.css-10dnl2k .title .unit-name, .css-10dnl2k .title .subunit-name, .css-10dnl2k .title.subunit-name');
    bodyFonts = document.querySelectorAll(
        'a, body, .box-tabs button, .box .box-title-bar .box-title, .agenda-item, #agenda-footer .agenda-footer-section #download-calendar-container, #current-date, .box .box-title-bar .box-title, body, .css-10dnl2k .login-status > a, .css-10dnl2k .login-status span, .box-tabs button, #myclasses-sched .gradeDetails strong'
    );
    bodyFonts2 = document.querySelectorAll('.primary-btn');
    highlightedText = document.querySelectorAll('.box-tabs button:hover, .box-tabs .box-tab-selected');
    highlightedElements = document.querySelectorAll('.primary-btn');
    animatedUnderline = document.querySelectorAll('.css-10dnl2k nav.header-nav .navlist > li > a::after')
    selectedElements = document.querySelectorAll('.box-tabs .box-tab-selected');
    icons = document.querySelectorAll(
        '.icon, .deadline-icon-calendary-day, .lms-announce-bullhorn-maroon, .colorize-black-to-maroon, #current-date #current-date-selector #curent-date-selector-icon, .box .box-title-bar .box-title-icon, .task-checkbox .task-checked, .checkbox-holder .task-checked, .drawer-caret-holder,\
        .deadline-icon-calendary-day .fas .fa-calendar-day, #current-date #current-date-selector #curent-date-selector-icon'
    );
    quickLinks = document.querySelectorAll('.quicklinks-container .quicklink .quicklink-anchor');
    hoverElements = document.querySelectorAll('.quicklinks-container .quicklink .quicklink-anchor:hover');
    quickLinkIcons = document.querySelectorAll('.quicklinks-container .quicklink .quicklink-anchor .quicklink-anchor-img');
    announcementBanner = document.getElementById('nc_canvas');
}

function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const timer = setInterval(() => {
            const el = document.querySelector(selector);
            if (el) {
                clearInterval(timer);
                resolve(el);
            }
            if (Date.now() - start > timeout) {
                clearInterval(timer);
                reject(`Timeout waiting for ${selector}`);
            }
        }, 100);
    });
}

async function loadFirstTime(theme) {
    await waitForElement('#myasu-main-content');
    await waitForElement('.box');

    initDomRefs();
    CustomizeSite(theme, true);
}


function HexToRGB(hex){
  hex = hex.slice(1);

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    return {
      r: parseInt(result[1], 16), // Convert the first pair (RR) to decimal
      g: parseInt(result[2], 16), // Convert the second pair (GG) to decimal
      b: parseInt(result[3], 16)  // Convert the third pair (BB) to decimal
    };
  } else {
    return null;
  }
}


let defaultBackground;

function ChangeFontStyle(bodyColor, color2, fontFamily, weight, size, letterSpacing, shadow){
    bodyFonts.forEach(function(el){
        if(bodyColor){
            el.style.color = bodyColor;
        }
        if(fontFamily){
            el.style.fontFamily = fontFamily;
        }
        if(weight){
            el.style.weight = weight;
        }
        if(size){
            el.style.size = size;
        }
        if(letterSpacing){
            el.style.letterSpacing = letterSpacing;
        }
        if(shadow){
            el.style.textShadow = '0px 2px 8px rgba(0, 0, 0, 0.33)';
        }

    });    

    if (color2){
        bodyFonts2.forEach(function(el){
            el.style.color = color2;
    });   

    }
}

function ChangeTitleStyle(color, fontFamily, weight, size, letterSpacing, shadow){
    titleFonts.forEach(function(el){
        if(color){
            el.style.color = color;
        }
        if(fontFamily){
            el.style.fontFamily = fontFamily;
        }
        if(weight){
            el.style.weight = weight;
        }
        if(size){
            el.style.size = size;
        }
        if(letterSpacing){
            el.style.letterSpacing = letterSpacing;
        }
    }); 
}

function ChangeHighlightColor(color){
    highlightedText.forEach(function(el){
        el.style.color = color;
    });
    highlightedElements.forEach(function(el){
        el.style.backgroundColor = color;
    });
    selectedElements.forEach(function(el){
        el.style.borderBottom = '2px solid '+color;
    });
    animatedUnderline.forEach(function(el){
        el.style.backgroundImage = 'linear-gradient(to right, transparent 0.5%, '+ color +' 0.5%)';
    });
}


function ChangeHeaderColor(bgvalue, outline, fontcolor){
    if (outline){
        headerMain.style.borderBottom = outline;
    }
    headerMain.style.background = bgvalue

    if(fontcolor){
        headerFonts.forEach(function(el){
            el.style.color = fontcolor;
        });
    }
    /*headerElements.forEach(function(el){
        el.style.background = bgvalue;
        //el.style.backgroundColor = bgvalue;
    });*/
}

function ChangeHeaderStyle(styleType, value){
   // headerElements.forEach(function(el){
        headerMain.style[styleType] = value;
    //});
}


function ChangeBackgroundFill(backgroundFill, hexValue){
    background.style.background = backgroundFill //?? 'none';
    //background.style.backgroundColor = hexValue;
}

function ChangeBackgroundStyle(styleType, value){
    background.style[styleType] = value;
}


function ChangeBoxesColor(colorValue){
    console.log(`CHANGING BOX COLOR TO ${colorValue}`)
    boxMain.forEach(function(el){
        //el.style.background = colorValue;
        el.style.backgroundColor = colorValue;
    });
}

function ChangeBoxesStyle(styleType, value){
    boxMain.forEach(function(el){
        el.style[styleType] = value;
    });
}

function RoundBoxes(value){
    if(value !== '0px'){
        console.log("ADDED!");
        if (announcementBanner){
            announcementBanner.classList.add('rounded_announcement');
        }
    }else{
        console.log("REMOVED!!");
        if (announcementBanner){
            announcementBanner.classList.remove('rounded_announcement');
        }
    }
    boxMain.forEach(function(el){
        el.style.borderRadius = value;
    });
}


function ChangeNavColor(hexValue){
    //navBar.style.backgroundColor = hexValue;
    navBar.forEach(function(el){
        el.style.backgroundColor = hexValue;
    });
}


function ChangeIconColor(newColor){
    icons.forEach(function(el){
        //if (el.style.filter){
        //    el.style.filter ='';
        //}
        el.style.color = newColor;
        el.style.backgroundColor = 'transparent';
    })
}

function ChangeQuickLinksStyle(newColor, outline, visibleIcons){
    quickLinks.forEach(function(el){
        if(newColor){
            el.style.background = newColor;
        }
        if(outline){
            el.style.border = outline;
        }
    })
    quickLinkIcons.forEach(function(el){
        if(!visibleIcons){
            el.style.visibility = 'hidden';
            el.width = '0px';
        }else{
            el.style.visibility = 'visible';
            el.style.width = '16px';
        }

    })
}

function ChangeHoverColor(newColor){
    hoverElements.forEach(function(el){
        el.style.background = newColor;
    });
}

let customBackground;
let isBackgroundAnImage = false;
let customBoxRoundness;
let customBoxColor;
let customBoxTransparency;
let customHeaderColor;
let customNavbarColor;
let customBoxOutlineColor;

function updateCustomValues(obj){
    //console.log(map.prototype.get('background'))

    isBackgroundAnImage = false;

    console.log(obj)
    for (const [key, value] of Object.entries(obj)) {
        switch(key){
            //3 different possible background values, but same output
            case 'background-url-input':
                isBackgroundAnImage = true;
            case 'background':
            case 'background-color-input':
                customBackground = value;
                break;
            case 'roundness-input':
                customBoxRoundness = value.toString() + "px";
                break;
            case 'box-color-input':
                console.log("COLOR CHANGED111")
                customBoxColor = value;
                break;
            case 'box-transparency-input':
                console.log("TRANSPARENCY CHANGINGGGG")
                customBoxTransparency = value/100;
                break;
            case 'header-color-input':
                customHeaderColor = value;
                break;
            case 'navbar-color-input':
                customHeaderColor = value;
                break;
            case 'box-outline-color-input':
                customBoxOutlineColor = value;
                break;
        }
    }

    if(currentTheme == 'custom'){
        console.log("ON CUSTOM THEME!!!")
        CustomizeSite('custom');
    }
}


function CustomizeSite(theme, first_ran){

    console.log("test");

    if (!document.body) return;

    if (!boxElements) return;

    console.log("test2");

//if running on start up, set everything unnecessary to transparent, so we have to change less stuff
    if (first_ran){
        defaultBackground = background.style.background
        boxElements.forEach(
            function(el){
                el.style.background = 'transparent';
        });
        headerElements.forEach(function(el){
            el.style.background = 'transparent';
            el.style.borderBottom = 'none';
        });
    }else{
        //window.location.reload()
    }

    console.log('test3');
    
    

    ChangeBoxesStyle('padding', '10px');


    switch(theme){
        case 'default':
            ChangeNavColor('#cecece');
            //change header css------------------------------
            ChangeHeaderColor('#FFFFFF');

            //change background css------------------------------
            ChangeBackgroundFill(defaultBackground);

            //change boxes css------------------------------
            ChangeBoxesColor('#FFF');

            RoundBoxes('0px');
            
            ChangeBoxesStyle('border', '1px solid #ccc');
            //ChangeBoxesStyle('backdrop-filter', 'blur(12px)');
            //ChangeBoxesStyle('padding', '15px');
            //ChangeBoxesStyle('borderTop', '1.5px solid hsla(210, 100%, 98%, 0.63)');

            ChangeFontStyle('#000000', '#FFFFFF', null, '300', '.75rem', '0', true);
            ChangeTitleStyle('#000000', null, '900', '2.5rem', '1px', false);
            ChangeHighlightColor('var(--myasu-maroon)');


            ChangeIconColor('var(--myasu-maroon)');//12aa81
            ChangeQuickLinksStyle('rgba(245,245,245,0.9)', '1px solid #d0d0d0', true);
            ChangeHoverColor('var(--myasu-maroon)');

            break;
        case 'dark-mode':
             //change header css------------------------------            
            ChangeNavColor('#242529');
            ChangeHeaderColor('#2e3138', '1px solid #000000');

            //change background css------------------------------
            ChangeBackgroundFill(null, '#1c1d20')
            //linear-gradient(90deg,rgba(25, 92, 133, 1) 0%, rgba(65, 148, 148, 1) 50%, rgba(181, 255, 234, 1) 100%);

            //change boxes css------------------------------
            ChangeBoxesColor('#25272e')

            RoundBoxes('20px');
            ChangeBoxesStyle('border', '2px solid #6e6f72');

            ChangeFontStyle('#ffffff', '#ffffff', null, '300', '.75rem', '0', true);
            ChangeTitleStyle('#ffffff', null, '900', '2.5rem', '1px', false);
            ChangeHighlightColor('var(--myasu-maroon)')

            ChangeIconColor('var(--myasu-maroon)');//12aa81 97d2e2 7aa88f
            ChangeQuickLinksStyle('var(--myasu-maroon)', 'none', true);
            ChangeHoverColor('var(--myasu-maroon)');



            //change header css------------------------------

            //change background css------------------------------
            //ChangeBackgroundFill('url(images/custom_backgrounds/dark-topo.png)')

            //change boxes css------------------------------
            

            //ChangeFontStyle(null, '#c33131');


            break;
        case 'beach-day':
            ChangeNavColor('#deb465');
             //change header css------------------------------
            ChangeHeaderColor('#f5d792');

            //change background css------------------------------
            ChangeBackgroundFill('#195c85');
            ChangeBackgroundStyle('background', 'linear-gradient(15deg,rgba(25, 92, 133, 1) 0%, rgba(65, 148, 148, 1) 50%, rgb(136, 213, 191) 100%)');


            //change boxes css------------------------------
            ChangeBoxesColor('#a8dadc')
            ChangeBoxesStyle('background', 'rgba(149, 188, 207, .5)');
            ChangeBoxesStyle('background', 'radial-gradient(circle,rgba(184, 230, 224, 0.34) 0%, rgba(216, 240, 237, 0.2) 50%, rgba(194, 241, 240, 0.36) 100%)');


            RoundBoxes('30px');
            ChangeBoxesStyle('border', '1.5px solid hsl(177, 100%, 91%)');
            //ChangeBoxesStyle('backdrop-filter', 'blur(12px)');
            ChangeBoxesStyle('padding', '15px');
            //ChangeBoxesStyle('borderTop', '1.5px solid hsla(210, 100%, 98%, 0.63)');

            ChangeFontStyle('#162842', '#162842', null, '300', '.75rem', '0', true);
            ChangeTitleStyle('#734c14', null, '900', '2.5rem', '1px', false);
            ChangeHighlightColor('#c5ffd5')

            ChangeIconColor('#276c7a');//12aa81 97d2e2 7aa88f
            ChangeQuickLinksStyle('#7bc0b9', 'none', true);
            ChangeHoverColor('#ff0000');


            break;
        case 'nature':
            ChangeFontStyle('#2d1905', '#eeeeda', null, '300', '.75rem', '0', true);
            ChangeTitleStyle('#cdc3a4', null, '900', '2.5rem', '1px', false);
            
            ChangeNavColor('#0d3726');
             //change header css------------------------------
            //ChangeHeaderColor('linear-gradient(0deg, #104832 0%, #195a35 100%)', '3px solid rgba(0, 0, 0, 0.3)');
            ChangeHeaderColor('#233d28', '3px solid rgba(17, 52, 25, 0.6)', '#eeeeda'); //104832
            //ChangeHeaderStyle('box-shadow', '0px 3px 7px');


            //change background css------------------------------
            ChangeBackgroundFill('#3a5a40');
            ChangeBackgroundStyle('background', 'linear-gradient(5deg, #233d28 0%, #3a5a40 50%, #588e52 100%)');

            //change boxes css------------------------------
            ChangeBoxesColor('#eeeeda')
            ChangeBoxesStyle('box-shadow', '0px 5px 10px rgba(0, 0, 0, 0.25)');
            //ChangeBoxesStyle('background', 'rgba(149, 188, 207, .5)');
            //ChangeBoxesStyle('background', 'radial-gradient(circle,rgba(184, 230, 224, 0.34) 0%, rgba(216, 240, 237, 0.2) 50%, rgba(194, 241, 240, 0.36) 100%)');

            RoundBoxes('7px');
            ChangeBoxesStyle('border', '1.5px solid hsl(63, 88%, 20%)');
            //ChangeBoxesStyle('backdrop-filter', 'blur(12px)');
            ChangeBoxesStyle('padding', '15px');
            //ChangeBoxesStyle('borderTop', '1.5px solid hsla(210, 100%, 98%, 0.63)');

            ChangeHighlightColor('#533928')

            ChangeIconColor('#2e6455');//12aa81 97d2e2 7aa88f
            ChangeQuickLinksStyle('#a3b18a', '1.5px solid hsl(63, 88%, 20%)', true);
            ChangeHoverColor('#175910');
            break;
        case 'rustic':
            break;
        case 'apple':
            //change header css------------------------------
            ChangeHeaderColor('#174960');

            //change background css------------------------------
            ChangeBackgroundFill('url(https://512pixels.net/wp-content/uploads/2025/06/13-Ventura-Dark-thumb.jpg)', null)

            //change boxes css------------------------------
            ChangeBoxesColor('hsla(211, 81%, 94%, 0.18)')

            RoundBoxes('30px');
            
            ChangeBoxesStyle('border', '1.5px solid hsla(211, 100%, 89%, 0.49)');
            ChangeBoxesStyle('backdrop-filter', 'blur(12px)');
            ChangeBoxesStyle('padding', '15px');
            ChangeBoxesStyle('borderTop', '1.5px solid hsla(210, 100%, 98%, 0.63)');
            ChangeBoxesStyle('box-shadow', 
                '1px 3px 10px rgba(0, 0, 0, 0.25),\
                -1px -3px 5px rgba(255, 255, 255, 0.2)');


            ChangeFontStyle('#FFFFFF', '#FFFFFF', ' -apple-system, BlinkMacSystemFont, sans-serif', '300', '.75rem', '0', true);
            ChangeTitleStyle('#FFFFFF', ' -apple-system, BlinkMacSystemFont, sans-serif', '900', '2.5rem', '1px', false);
            ChangeHighlightColor('#007AFF')

            ChangeNavColor('#143545');

            ChangeIconColor('rgb(0, 192, 232)');//12aa81
            ChangeQuickLinksStyle('#007AFF', 'none', false);
            ChangeHoverColor('#ff0000');
            break;
        case 'custom':
            /*
            let customBackground;
            let customBoxRoundness;
            let customBoxColor;
            let customBoxTransparency;
            let customHeaderColor;
            let customNavbarColor;
            */
            
            if(customBackground){
                console.log(isBackgroundAnImage)
                if(isBackgroundAnImage){
                    ChangeBackgroundFill(`url(${customBackground})`)
                    ChangeBackgroundStyle('backgroundRepeat', 'noRepeat');
                    ChangeBackgroundStyle('backgroundAttachment', 'fixed');
                    ChangeBackgroundStyle('backgroundSize', 'cover');
                }else{
                    ChangeBackgroundFill(customBackground);
                    //ChangeBackgroundStyle('backgroundRepeat', '');
                    //ChangeBackgroundStyle('backgroundAttachment', '');
                    //ChangeBackgroundStyle('backgroundSize', '');
                }
            }
            if(customBoxRoundness){
                RoundBoxes(customBoxRoundness);
            }
            if(customBoxColor){
                if(customBoxTransparency){
                    let rgbValue = HexToRGB(customBoxColor);
                    ChangeBoxesColor(`rgba(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}, ${customBoxTransparency})`);
                }else{
                    ChangeBoxesColor(customBoxColor);
                }
                
            }
            if(customBoxOutlineColor){
                console.log(`2px solid ${customBoxOutlineColor}`)

                ChangeBoxesStyle('border', `2px solid ${customBoxOutlineColor}`);
            }
            if(customHeaderColor){
                ChangeHeaderColor(customHeaderColor);
            }
            if(customNavbarColor){
                ChangeNavColor(customNavbarColor);
            }
            
            break;
    }
}