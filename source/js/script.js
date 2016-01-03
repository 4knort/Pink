var menuBtn = document.querySelector(".main-navigation-button");
var menu = document.querySelector(".main-nav");
var menuList = document.querySelector(".main-nav__list");
var plus = document.querySelectorAll (".counter__btn--plus");
var minus = document.querySelectorAll (".counter__btn--minus");
var counterInput = document.querySelector (".counter__input");
var areaTravelers = document.querySelector (".form-amount__item-wrap");
var travelersNumber = document.querySelector(".form-number");
var travelerPlus = document.querySelector(".counter__btn--plus-traveler");
var travelerMinus = document.querySelector(".counter__btn--minus-traveler");





menuBtn.addEventListener("click", function(event){
  event.preventDefault();
  menuBtn.classList.toggle("navigation-button-close");
  menu.classList.toggle("main-nav--open");
  menuList.classList.toggle("main-nav__list--open");
})

for(i=0; i<plus.length; i++){
  plus[i].addEventListener("click", function(event){
    event.preventDefault();
    var el = event.target;
    var parent = el.parentNode;
    counterInput = parent.querySelector(".counter__input");
    if(parseInt(counterInput.value) < 30){
      counterInput.value = parseInt(counterInput.value) + 1;
    };
  });
}

travelerPlus.addEventListener("click", function(){
  addTraveler();

  var deleteBtn = document.querySelectorAll(".form-amount__delete");

  for(z=0; z<deleteBtn.length; z++){
    deleteBtn[z].addEventListener("click", function(event){
      event.preventDefault();
      var el = event.target;
      var parent = el.parentNode;
      parent.parentNode.removeChild(parent);
      counterInput.value = parseInt(counterInput.value) - 1;
    })
  }
})
travelerMinus.addEventListener("click", function(){
  delTraveler();
})

for(i=0; i<minus.length; i++){
  minus[i].addEventListener("click", function(event){
    event.preventDefault();
    var el = event.target;
    var parent = el.parentNode;
    counterInput = parent.querySelector(".counter__input");
    if(parseInt(counterInput.value) -1 >= 0){
      counterInput.value = parseInt(counterInput.value) - 1;
    }
  });
}

function addTraveler(){
  var travelersTemplate = document.querySelector("#travelers-template").innerHTML;
  var div = document.createElement("div");
  var travelersHtml = Mustache.render(travelersTemplate, {"value": parseInt(counterInput.value)})
  div.classList.add("form-amount__item");
  div.classList.add("clearfix");
  div.innerHTML = travelersHtml;
  areaTravelers.appendChild(div);
}

function delTraveler() {
  if(!areaTravelers.childNodes[0]){
    return;
  }
  areaTravelers.removeChild(areaTravelers.lastChild);
}


(function(){
  if(!("FormData" in window)){
    return;
  }
  var queue = [];
  var form = document.querySelector(".form");

  function removePreview(div) {
    queue = queue.filter(function(element) {
    return element.div != div;
    });

    div.parentNode.removeChild(div);
  }

  form.addEventListener("submit", function(event){
    event.preventDefault();

    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    queue.forEach(function(element) {
      data.append("images", element.file);
    });

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function(){
      if(xhr.readyState == 4){
        console.log(xhr.responseText);
      }
    });
    xhr.send(data);
    form.reset();
  });

  if ("FileReader" in window){
    form.querySelector(".photo-upload").addEventListener("change", function(){
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
      this.value = "";
    });

    function preview(file){
      var area = document.querySelector(".photos-items")
      var imgTemplate = document.querySelector("#image-template").innerHTML;
      if (file.type.match(/image.*/)){
        var reader = new FileReader();

        reader.addEventListener("load", function(event){

          var html = imgTemplate.replace("{{image}}", event.target.result);
          html = html.replace("{{name}}", file.name);

          var div = document.createElement("div");
          div.classList.add("photos-items__item");
          div.innerHTML = html;
          area.appendChild(div);

          queue.push({file: file, div: div});

          div.querySelector(".photos-items__btn").addEventListener("click", function(event){
            event.preventDefault();
            removePreview(div);
          });

        });

        reader.readAsDataURL(file);
      }
    }
  }

})();

