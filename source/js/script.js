var menuBtn = document.querySelector(".main-navigation-button");
var menu = document.querySelector(".main-nav");
var menuList = document.querySelector(".main-nav__list")

menuBtn.addEventListener("click", function(event){
  event.preventDefault();
  menuBtn.classList.toggle("navigation-button-close");
  menu.classList.toggle("main-nav--open");
  menuList.classList.toggle("main-nav__list--open");
})