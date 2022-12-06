document.addEventListener('DOMContentLoaded', function() {

    const   profileButton = document.querySelector('.header__profile')
            profileMenu = document.querySelector('.profile-menu')

    function showMenu(button, menu) {
        button.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
    };


    showMenu(profileButton, profileMenu)
}); 