$(document).ready(function () {
  let data = sessionStorage.getItem("data");
  let items = JSON.parse(data);
  let arr2 = [];
  let count = 1;
  let itm = sessionStorage.getItem("data2");
  let x = JSON.parse(itm);
  let counts = sessionStorage.getItem("count1");
  if (counts > 1) {
    count = counts;
    $(".count").text(count);
  }

  $(".chekifcheked").each(function () {
    let result = sessionStorage.getItem($(this).next().text());
    if (result) {
      $(this).attr("checked", "checked");
    }
  });

  $(".chekifcheked").click(function () {
    location.reload();
  });

  $(".chekifcheked").click(function () {
    let x = JSON.parse(sessionStorage.getItem("data2"));
    if (x) {
      arr2 = x;
    }
    if ($(this).is(":checked")) {
      sessionStorage.setItem("count1", 1);
      sessionStorage.setItem($(this).next().text(), true);
      let cat = $(this).next().text();
      let arr3 = [];
      arr3 = filterProducts(items, cat);
      arr2.push(...arr3);
    } else {
      sessionStorage.removeItem($(this).next().text());
      let cat = $(this).next().text();
      let x = RemoveItems(arr2, cat);
      arr2 = x;
    }
    sessionStorage.setItem("data2", JSON.stringify(arr2));
  });

  function filterProducts(item, cat) {
    let arr = [];
    if (item) {
      for (let x = 0; x < item.length; x++) {
        if (items[x].Category === cat) {
          arr.push(items[x]);
        }
      }
    }
    return arr;
  }

  function RemoveItems(arr, cat) {
    let arr1 = [];
    for (let x = 0; x < arr.length; x++) {
      if (arr[x].Category !== cat) {
        arr1.push(arr[x]);
      }
    }
    return arr1;
  }

  $(".prevbtn").click(function () {
    if (count == 1) {
      $(".prevbtn").prop("disabled", true);
    } else {
      count--;
      sessionStorage.setItem("count1", count);
      $(".count").text(count);
      location.reload();
    }
  });

  $(".nextbtn").click(function () {
    $(".prevbtn").prop("disabled", false);
    count++;
    sessionStorage.setItem("count1", count);
    $(".count").text(count);
    location.reload();
  });

  function pagiNation() {
    let t = 0;
    let currntCount = sessionStorage.getItem("count1");
    if (currntCount > 1) {
      let newLength = currntCount * 9;
      let productCount = newLength - 9;
      t = productCount;
    }
    return t;
  }
  function products() {
    let t = pagiNation();
    let item;
    if (x && x.length > 0) {
      item = x;
    } else {
      item = items;
    }
    let countStop = Math.round(item.length / 9);
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        let data = `<div class="col-6 col-md-6 col-lg-4 mb-3 prodct" style="height:350px">
   <div class="card shadow h-100 border-0 shadow-lg p-3 mb-5 bg-white rounded">
     <div class="card-img-top">
       <img src="${item[t].image}" class="img-fluid mx-auto d-block" alt="Card image cap" style="height:200px">
     </div>
     <div class="card-body text-center" style="display: flex;
     flex-direction: column;">
       <h4 class="card-title">
         <a class="font-weight-bold text-dark text-uppercase small pro1">${item[t].ProductName}</a>
       </h4>
       <h5 class="card-price small text-warning">
         <i>
           <s>$199</s>$${item[t].Price}</i>
       </h5>
     </div>
   </div>
 </div>`;
        $(".PageRow").append(data);
        t++;
      }
      $(".rowContainer").append($(".PageRow"));
    }
  }

  products();

  $(".prodct").click(function () {
    findproduct($(this).text());
    location.replace("http://127.0.0.1:5500/index/productPage.html");
  });

  function findproduct(product) {
    console.log(product.trim().split("\n"))
    let x = product.trim().split("\n");
    console.log(x[0], x[x.length - 1].toString().trim().split("$").pop());
    sessionStorage.setItem("itemName", x[0]);
    sessionStorage.setItem(
      "itemPrice",
      x[x.length - 1].toString().trim().split("$").pop()
    );
  }
});
