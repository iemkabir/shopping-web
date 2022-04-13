$(document).ready(function () {
    setTimeout(()=>{
        $("#loader").css("display","none")
    },500)
    let CartData = {};
    
    //let item = JSON.parse(sessionStorage.getItem("items"))
    let user = sessionStorage.getItem("userAuth");
    console.log((JSON.parse(user).token))
    if(JSON.parse(user).token !== undefined || JSON.parse(user).token !== null){

        //API call to Get cart Items

        $.ajax({
            url: "http://localhost:4000/api/user/cart",
            type: "GET",
            headers: {"Authorization": `Bearer ${JSON.parse(user).token}`},
            success: function (data) {
                if(data.data.length >= 1){
                    //
                    sessionStorage.setItem("items", JSON.stringify(data))

                    $(".CartBox").removeClass("hideItems");
                    $(".EmptyCart").addClass("hideItems");

                    createCartElem(data.data)
                    UpdateCartPrice(data.data)
                    return;
                }
            },
            error: function (err) {
              console.log("okeyb", err);
            },
          });


          // Function to find Element that has to be removed from Database

        function findCartItemToDelete(arr){
            let item = JSON.parse(sessionStorage.items)
            let myObj = {}
             myObj.brandName =  arr[0] || arr[1].trim().split(":")[2].trim();
             myObj.priceOf = arr[10].trim() || arr[4].trim();
             console.log(myObj)
             let deleteItem = item.data.filter((el)=>{
               return el.ProductName == myObj.brandName && el.price == myObj.priceOf;
           })

          return deleteItem;
        }

        function itemDelete(arr){
            let item = JSON.parse(sessionStorage.items)
            console.log(item)
            
            let deleteItem = item.data.filter((el)=>{
                return el._id != arr._id;
            })
            return deleteItem;
        }
        

// Capturing Element to remove from cart box

        $(document).on('click', '.removeBtn', function() {
           const deletedCartList = findCartItemToDelete($(this).parent().siblings().text().trim().split("\n"))
           console.log($(this).parent().siblings().text().trim().split("\n"))
           let y = itemDelete(deletedCartList[0]);
           UpdateCartPrice(y)
           sessionStorage.setItem("items", JSON.stringify({"data": y}));
           apiCallToDeleteItem("http://localhost:4000/api/user/deleteItem", deletedCartList[0], "delete");
           if(y.length == 0){
            $(".CartBox").addClass("hideItems");
            $(".EmptyCart").removeClass("hideItems");
        }
           //Removing Element on click
           $(this).parents()[1].remove();
         })


         // Serving element to the cart box

         function UpdateCartPrice(data){
             const total = data.reduce((totalPricce, items)=>{
                 return totalPricce + parseFloat((items.price.slice(1,6)))
             },0)
             console.log(total)
             $(".dlist-align > dd").eq(0).text(`(${data.length})`)
             $(".dlist-align > dd").eq(1).text(total.toFixed(2))
             $(".dlist-align > dd").eq(3).text((total-10).toFixed(2))
         }
        

         // Function to create Cart elements
        
         function createCartElem(Data){
            for(let x = 0; x < Data.length; x++){
                let Elem = `<tr class="ItemTable">
                <td>
                    <figure class="itemside align-items-center">
                        <div class="aside"><img src="${Data[x].image}" class="img-sm" name="Image"></div>
                        <figcaption class="info"> <a href="#" class="title text-dark" data-abc="true">${Data[x].ProductName}</a>
                            <p class="text-muted small">SIZE: L <br> Brand: ${Data[x].ProductName}</p>
                        </figcaption>
                    </figure>
                </td>
                <td> <select class="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select> </td>
                <td>
                    <div class="price-wrap"> <var class="price">${Data[x].price}</var> </div>
                </td>
                <td class="text-right d-none d-md-block"> <button type="button" class="btn btn-dark removeBtn">Remove</button></td>
            </tr>`
    
            $(".AddCartData").append(Elem);
            }
         }

         // API call to delete Item

        function apiCallToDeleteItem(url,obj,methodType){
            $.ajax({
                url: url,
                type: methodType,
                data : obj,
                headers: {"Authorization": `Bearer ${JSON.parse(user).token}`},
                success: function (data) {
                    console.log(data)
                  return data;
                },
                error: function (err) {
                  console.log("okeyb", err);
                },
              });
        }

        
    }

    $("body").on("click", ".checkOutRemove", function(){
        console.log($(this).parent().siblings().text().trim().split("\n")[4].trim())
        const deletedCartList = findCartItemToDelete($(this).parent().siblings().text().trim().split("\n"));
        console.log(deletedCartList)
        let y = itemDelete(deletedCartList[0]);
           UpdateCartPrice(y)
           sessionStorage.setItem("items", JSON.stringify({"data": y}));

           apiCallToDeleteItem("http://localhost:4000/api/user/deleteItem", deletedCartList[0], "delete");

           if(y.length == 0){
            window.location.replace("http://127.0.0.1:5500/index/cart.html")
        }
    })
});