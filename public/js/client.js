let hello = document.querySelector(".hello");
let hillo = document.querySelector(".hillo");
function addCards(data, row, colmn) {
  let newDiv1 = document.createElement("div");
  for (let x = 0; x < row; x++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "myrow");
    let index = Math.floor(Math.random() * 90);
    for (let y = 0; y < colmn; y++) {
      let colDiv = document.createElement("div");
      colDiv.classList.add("Mycolumn");

      let cardDiv = document.createElement("div");
      cardDiv.style.width = "18rem";
      cardDiv.classList.add("columnDiv");

      let img = document.createElement("img");
      img.classList.add("card-img-top", "img-fluid", "imgCard");
      img.src = data[y].image;
      cardDiv.append(img);

      let ProductDiv = document.createElement("div");
      ProductDiv.classList.add("card-body");

      let h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.innerHTML = data[y].ProductName;
      ProductDiv.append(h5);

      let p = document.createElement("p");
      p.classList.add("card-text");
      p.innerHTML = data[y].Description;
      ProductDiv.append(p);

      let h4 = document.createElement("h4");
      h4.innerHTML = `$${data[y].Price}`;
      ProductDiv.append(h4);

      let btn = document.createElement("BUTTON");
      btn.classList.add("btn", "btn-outline-secondary", "AddCart");
      btn.type = "button";
      btn.innerHTML = "Add To Cart";
      if (btn.click()) {
        console.log(ProductDiv);
      }
      ProductDiv.append(btn);

      cardDiv.append(ProductDiv);

      rowDiv.append(cardDiv);
    }
    newDiv1.append(rowDiv);
  }

  return newDiv1;
}

$(document).ready(function () {

  setTimeout(()=>{
    $("#loader").css("display","none")
},500)

  $("body").on("mouseover", ".columnDiv", function (e) {
    $(this).addClass("card");
  }),
    $("body").on("mouseout", ".columnDiv", function (e) {
      $(this).removeClass("card");
    });

  $.ajax({
    url: "http://localhost:4000/api/",
    method: "GET",
    success: function (data) {
      if(data){
        sessionStorage.setItem("data", JSON.stringify(data));
      console.log(data);
      mostPopular(data);
      bestCollection(data);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });

  function bestCollection(data) {
    const newData = data.filter((e) => {
      return e.Price > 60;
    });
    let data2 = addCards(newData, 2, 4);
    return hillo.prepend(data2);
  }

  function mostPopular(data) {
    const newData = data.filter((e) => {
      return e.Price < 47 && e.Price > 38;
    });
    let data3 = addCards(newData, 2, 4);
    return hello.prepend(data3);
  }
});
//module.export={addCart:addCards}
