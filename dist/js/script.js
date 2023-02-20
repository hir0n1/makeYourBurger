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

    const   addElementBtn = document.querySelectorAll('.build-burger__plus')
            removeElementBtn = document.querySelectorAll('.build-burger__minus')
            burger = document.querySelector('.build-burger__burger')
            quantity = document.querySelectorAll('.build-burger__number')
            
            


            
    function addBurgerElement() {
        let i = 0;
            quantityCutlet = 0;

        let burgerItem = '<img class="build-burger__item" src="./img/burger/bun_bottom.png" alt="bun_bottom">'
        
        addElementBtn.forEach((item, index) => {
            item.addEventListener('click', () => {
                i = i + 40;
                if (index == 0) {
                    burgerItem = burgerItem + `<img style="bottom: ${i}px;" class="build-burger__item js-cutlet" src="./img/burger/cutlet.png" alt="cutlet"></img>`
                    burger.innerHTML = `${burgerItem}`
                    quantityCutlet += 1
                    quantity[0].innerHTML = `${quantityCutlet}`
                }
            })
        })
        removeElementBtn.forEach((item, index) => {
            cutlets = document.querySelectorAll('.js-cutlet')
            
            item.addEventListener('click', () => {
                if (index == 0) {
                    // cutlets.splice(cutlets.length - 1, 1)
                    console.log(cutlets)
                    if (quantityCutlet > 0){
                        quantityCutlet = quantityCutlet - 1
                        quantity[0].innerHTML = `${quantityCutlet}`
                    }
                }
            })
        })
    }

    addBurgerElement()
}); 