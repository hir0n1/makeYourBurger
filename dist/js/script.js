document.addEventListener('DOMContentLoaded', function() {

    // Кнопки

    const   profileButton = document.querySelector('.header__profile')
            profileMenu = document.querySelector('.profile-menu')
            changeScreenBtn = document.querySelectorAll('.js-screen-btn')
            screen = document.querySelectorAll('.js-screen')
            headerBtns = document.querySelectorAll('.header__nav-btn')
            discover = document.querySelector('.discover')
            
    function showMenu(button, menu) {
        button.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
    };
    
    function changeScreen(button, screen) {
        button.forEach((btn) => {
           btn.addEventListener('click', () => {    
                if(btn.classList.contains('header__nav-btn_active')) {
                    return;
                }
                headerBtns.forEach((item) => {
                    if(item.classList.contains('header__nav-btn_active')) {
                        item.classList.remove('header__nav-btn_active')

                    } else {
                        item.classList.add('header__nav-btn_active')
                    } 
                })
                screen.forEach((item) => {
                    item.style.display = item.style.display === 'none' ? 'flex' : 'none';
                })
                discover.classList.toggle('discover_build')
            }); 
        });
    };

    changeScreen(changeScreenBtn, screen)
    showMenu(profileButton, profileMenu)

    /// burger 

    let topBun;
    const burger = document.querySelector('.build-burger__burger');


    function loadInrgedients() {
        const template = document.querySelector('#ingredient');
        const ingredients = document.querySelector('.build-burger__ingridients');
        let data;
        

        readFile("./js/data.json", function(text){
            data = JSON.parse(text);
            data.forEach((el, i) => {
                if (el.auto) {
                    i--;
                    return;
                }
                const clone = template.content.cloneNode(true);
                const cloneImg = document.createElement("img");
                const cloneName = clone.querySelector(".build-burger__name");
                const cloneAddBtn = clone.querySelector(".build-burger__plus");
                const cloneRemoveBtn = clone.querySelector(".build-burger__minus");
                const amount = clone.querySelector(".build-burger__amount");
                
                cloneImg.classList.add("build-burger__img");
                cloneImg.src = el.img;
                cloneName.innerHTML = el.name;
                
                ingredients.appendChild(clone);
                const appendClone = ingredients.querySelector(`.ingredient:last-of-type`);
                appendClone.insertBefore(cloneImg, cloneName);

                el.amount = amount;

                cloneAddBtn.addEventListener("click", () => addInrgedient(el));
                cloneRemoveBtn.addEventListener("click", () => removeInrgedient(el));

                
            });
            topBun = data[0]
        }); 
    }
   
    function readFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
    }
    
    

    

    let ingHeight = 20

    function addInrgedient(ing) {
        const newIngridient = document.createElement('img')
        const burgerElements = document.querySelectorAll('.build-burger__item')

        newIngridient.classList.add(ing.name);
        newIngridient.classList.add('build-burger__item')
        
        // верхняя булочка
        if (burgerElements[burgerElements.length - 1].classList.contains('Bun-top')) {
            burgerElements[burgerElements.length - 1].remove()
            ingHeight -= 20
        }

        // проверка на группу ингридиентов и добавление 

        if (ing.img_group) {
            newIngridient.src = ing.img_group;
        } else {
            newIngridient.src = ing.img;
        }
        ingHeight += 20
        newIngridient.style.bottom = `${ingHeight}px`
        burger.appendChild(newIngridient);

        //кол-во ингридиентов
        if (ing.amount) {ing.amount.dataset.value++}

        if (addTopBunTimout) {
            clearTimeout(addTopBunTimout);
            addTopBunTimout = null;
        } 
        if (burgerElements.length >= 2) {addTopBun()}
    }

    function removeInrgedient(ing) {

        const burgerSceneElements = document.querySelectorAll(`.${ing.name}`)
        const burgerElements = document.querySelectorAll('.build-burger__item')
        if (typeof burgerSceneElements[burgerSceneElements.length - 1] === 'undefined') {return;}
        burgerSceneElements[burgerSceneElements.length - 1].remove();

        // верхняя булочка
        
        if (burgerElements[burgerElements.length - 1].classList.contains('Bun-top')) {
            burgerElements[burgerElements.length - 1].remove()
            ingHeight -= 20
        } 
        if (burgerElements.length > 2) {addTopBun()} 
        if (addTopBunTimout) {
            clearTimeout(addTopBunTimout);
            addTopBunTimout = null;
        } 
        

        // высота игридиента 
        ingHeight -= 20
        const bottomToRemove = parseInt(burgerSceneElements[burgerSceneElements.length - 1].style.bottom);
        const ingToUpdate = document.querySelectorAll(`.build-burger__item[style*="bottom"]:not([style*="bottom:${bottomToRemove}px"])`);
        
        ingToUpdate.forEach((element) => {
            if (parseInt(burgerSceneElements[burgerSceneElements.length - 1].style.bottom) <  parseInt(element.style.bottom)) {
                const currentBottom = parseInt(element.style.bottom);
                element.style.bottom = `${currentBottom - 20}px`;
            }
        });

        //

        if (ing.amount) {ing.amount.dataset.value--}
    }

    var addTopBunTimout;

    function addTopBun() {
        addTopBunTimout = setTimeout(() => {
            addInrgedient(topBun);
            clearTimeout(addTopBunTimout);
            addTopBunTimout = null;
            
        }, 3000);  
    }

    loadInrgedients()

}); 
