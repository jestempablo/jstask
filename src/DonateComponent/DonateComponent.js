import './DonateComponent.less';
import template from './DonateComponent.html';

window.donate = (function() {

    var updateProgress,
        giveNow,
        validateInput,
        saveForLater,
        elements = {},
        GOAL = 500,
        current = 57;

    var componentElement = document.createElement('div');
    document.body.appendChild(componentElement);
    componentElement.outerHTML = template;


    elements.giveForm = document.getElementById('giveForm');
    elements.numberInput = document.getElementById('numberInput');
    elements.saveForLater = document.getElementById('saveForLater');
    elements.progressBar = document.getElementById('progressBar');
    elements.progressValue = document.getElementById('progressValue');

    elements.numberInput.value = localStorage.getItem('savedAmount') || 50;
    
    updateProgress = function(added){
        current += parseInt(added);

        var css = current > GOAL ? 0 : 'calc(100% - ('+current+'%/'+(GOAL/100)+'))';

        elements.progressBar.style.right = css;
        elements.progressValue.innerText = GOAL - current;
    }

    giveNow = function(e){
        e = e || window.event;
        e.preventDefault();
        if(e.target.checkValidity()){
            updateProgress(elements.numberInput.value);
            alert('Thank you for your donation!');
        }
    }

    validateInput = function(e){
        e = e || window.event;

        var elem = e.target || elements.numberInput;
        
        if(isNaN(elem.value)){
            elem.setCustomValidity("Must be a number!");
            elem.reportValidity();
        } else if (elem.value.indexOf('.') !== -1 && elem.value.split('.')[1].length>2) {
            elem.setCustomValidity("No more than two decimal places!");
            elem.reportValidity();
        } else if (elem.value < 0) {
            elem.setCustomValidity("Can't be negative!");
            elem.reportValidity();
        } else {
            elem.setCustomValidity("");
        }
    }

    saveForLater = function(){
        if(!elements.giveForm.checkValidity()){
            alert('Cannot save invalid amount!')
        } else {
            localStorage.setItem('savedAmount',elements.numberInput.value);
            alert('Saved your input. See you soon!')
        }
    }

    return {
        giveNow:giveNow,
        validateInput:validateInput,
        saveForLater:saveForLater
    };

})();
