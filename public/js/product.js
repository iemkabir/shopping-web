$(document).ready(function(){
    let y = 0;
    let data = sessionStorage.getItem("data");
    let items = JSON.parse(data);
    let itemName = sessionStorage.getItem("itemName");
    let itemPrice = sessionStorage.getItem("itemPrice");
    let product = items.filter((el)=>{
        return el.ProductName == itemName && el.Price == itemPrice;
     })


     $(".ProductName").text(product[0].ProductName);
     $(".productDesc").text(product[0].Description);
     $(".ProductPrice").text(`$${product[0].Price}`);
     $(".ProductCat").text(product[0].Category);
     $(".ProductImage").attr("src", product[0].image);

     
    //  sessionStorage.setItem("product", JSON.stringify(product));

    corosolConatiner()

     $(".nextColosol").click(function(){
        let widths = $(".corosolContainer")[0].getBoundingClientRect();
        $(".corosolContainer").animate({scrollLeft:`+=${widths.width}`},1000);
    })

    $(".previousColosol").click(function(){
        let widths = $(".corosolContainer")[0].getBoundingClientRect();
        $(".corosolContainer").animate({scrollLeft:`-=${widths.width}`},1000);
    })

    //  $(".corosolContainer").each(function(i){
    //      let width = $(".corosolContainer")[0].getBoundingClientRect().width;
    //  })

     function corosolConatiner(){
         for(let x = 0; x < 10;x++){
             let elem = `<div class="items-corosol">
             <div >
               <img style="width: 240px;" src="${items[x+y].image}" alt="">
             </div>
             <div>
               <h5 style="margin-top:10px; color: black;font-size: 17px;">${items[x+y].ProductName}</h5>
               <h6 style="color: red;font-size: 17px;">$${items[x+y].Price}</h6>
             </div>
            </div>`

            $(".corosolContainer").append(elem)
         }
     }


     $(document).on("click", ".items-corosol", function(){
         let arr = $(this).text().trim().split("\n");
         console.log(arr)
         sessionStorage.setItem("itemName",arr[0]);
         sessionStorage.setItem("itemPrice",arr[1].trim());
     })


})