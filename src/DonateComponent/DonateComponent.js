import './DonateComponent.less';
import template from './DonateComponent.html';

window.donate = (function() {

    var updateProgress,
        giveNow,
        validateInput,
        isInvalid,
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
        if(!isInvalid(elements.numberInput.value)){
            updateProgress(elements.numberInput.value);
            alert('Thank you for your donation!');
        } else {
            alert('Cannot donate invalid amount!');
        }
    }

    validateInput = function(e){
        e = e || window.event;

        var elem = e.target || elements.numberInput;
        
        elem.setCustomValidity(isInvalid(elem.value))
        elem.reportValidity();
    }

    isInvalid = function(value){
        var invalidity = '';
        if(!value){
            invalidity = "Cannot be empty!";
        } else if(isNaN(value)){
            invalidity = "Must be a number!";
        } else if (value.indexOf('.') !== -1 && value.split('.')[1].length>2) {
            invalidity = "No more than two decimal places!";
        } else if (value < 0) {
            invalidity = "Can't be negative!";
        }

        return invalidity;
    }

    saveForLater = function(){
        if(isInvalid(elements.numberInput.value)){
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
