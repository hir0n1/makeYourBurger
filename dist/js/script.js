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
                        discover.classList.remove('discover_build')
                    } else {
                        item.classList.add('header__nav-btn_active')
                        discover.classList.add('discover_build')
                    }
                })
                screen.forEach((item) => {
                    item.style.display = item.style.display === 'none' ? 'flex' : 'none';
                })
            }); 
        })  
    };

    changeScreen(changeScreenBtn, screen)
    showMenu(profileButton, profileMenu)
}); 