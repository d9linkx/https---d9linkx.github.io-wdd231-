window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('sidebarToggle');
    const sidebarContent = document.querySelector('.sidebar-content');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        sidebarContent.classList.toggle('active');
    });
});
