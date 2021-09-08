' use strict ';

class Tipped {
    constructor(option){
        const {
            speed = 50,
            strings = [],
            visibleElements = [], 
            id = 0,
            flag = true
        } = option;
        this.speed = speed;
        this.strings = strings;
        this.id = id;
        this.visibleElements = visibleElements;
        this.flag = flag;
    }

    init(selector){
        this.addStrings(selector); 
        window.addEventListener('scroll', function() {
            animateTipe.addStrings(selector);
        }); 
    }

    addStrings(selector){
        let elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            this.watchElements(el);
        });
    }

    watchElements(target){
    // Все позиции элемента
    let targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
    // Получаем позиции окна
    windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
        };
    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            target.classList.remove('dynamic-text');
            this.visibleElements.push(target);
            this.strings.push(target.textContent.split(''));
            target.textContent= '';
        }else if(this.flag){
           this.animated();
           this.flag = false;
        } 
    }

    animated(){
        let i = 0;
        let j = 0;
        let animated = () => {
            if(i === this.visibleElements.length ){
                clearInterval(timerid);
                this.strings = [];
                this.visibleElements = [];
                this.flag = true;
            }else{
                this.visibleElements[i].textContent += this.strings[i][j];
                j++;
                if(j === this.strings[i].length){
                    j = 0;
                    i++;
                   
                }
            }
        };

        let timerid = setInterval(animated, this.speed);
    }
}

class AnimateTipe extends Tipped {
    constructor(option = {}){
        super(option);
    }
}


