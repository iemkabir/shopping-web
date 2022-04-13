$(document).ready(function () {
  let user = sessionStorage.getItem("userAuth");
  let x = 0;
  if(!(JSON.parse(user).token)){
     $(".signin").show();
     $(".Account").hide();
     $(".myCart").click(function(){
      window.location.replace("http://127.0.0.1:5500/index/login.html");
     })
  }else{
    $(".signin").hide();
    let logout = $(`<li class="nav-item logout"><a href="#" class="nav-link waves-effect"> Logout </a></li>`);
    $(".MenuList").append(logout);
    
     $(".Account").click(function(){
      window.location.replace("http://127.0.0.1:5500/index/dashboard.html");
     })
  }


    $("body").on("click", ".AddCart", function (e) {
      let arr3= [];
      if(!JSON.parse(user).token){
        window.location.href("http://127.0.0.1:5500/index/login.html");
      }else{
        $(this).text("Added").attr("disabled", true);;
      let data = $(this).parent();
      let img = data[0].previousSibling.src;
      arr3.push(img);
      data.each(function () {
        $(this)
          .children()
          .each(function () {
            arr3.push($(this).text());
          });
      });
        
      $.ajax({
        url:"http://localhost:4000/api/user/additem",
        type: "POST",
        data: {
          "image": arr3[0],
          "ProductName": arr3[1],
          "Description": arr3[2],
          "price": arr3[3]
        },
        headers: {"Authorization": `Bearer ${JSON.parse(user).token}`},
        success: function(data){
          console.log(data)
        },
        error: function(err){
          console.log(err)
        }

      })
      
      if(arr3.length == 4){
        arr3 = [];
      }
    }
    })


    $("body").on("click", ".logout", function(){
      sessionStorage.removeItem("userAuth");
      window.replace("http://127.0.0.1:5500/index/index.html")
    })

});
