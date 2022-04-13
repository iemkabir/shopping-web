$(document).ready(function(){
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    let arr3 = [];
    let data = {};
    let arr = [];
  function isEmail(email) {
    var EmailRegex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return EmailRegex.test(email);
  }
  $(".signupbtn").click(function () {
    $("input").each(function () {
      if ($(this).val() === "") {
        $(".alert").show().text("All Fields Are Requierd");
        setTimeout(function(){
          $(".alert").hide()
        }, 2000);
      } else {
        arr.push($(this).val());
      }
    });
    console.log(arr);
    if (arr[3] != arr[2]) {
      $(".alert").show().text("Passwords Do Not Match");
    } else if (!pattern.test(arr[1])) {
      $(".alert").show().text("Enter a valid email");
    } else {
      $.ajax({
        url: "http://localhost:4000/api/user/Register",
        type: "POST",
        data: {
          fullName: arr[0],
          email: arr[1],
          password: arr[2],
        },
        dataType: "application/json",
        success: function (response) {
          console.log(response);
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  }),
    $(".loginbtn").click(function(){
        if($(".logSign").val() == "" || $(".loginpass").val() == ""){
            console.log("all fields are required");
        }else if(!pattern.test($(".logSign").val())){
            console.log("enter a valid email");
        }else{
              const data = {
                email : $(".logSign").val(),
                password : $(".loginpass").val()
              }

            $.ajax({
                url: "http://localhost:4000/api/user/login",
                method:"POST",
                data: data,
                success: function(data){
                    if(data){
                        sessionStorage.setItem("userAuth", JSON.stringify(data));
                        window.location.replace("http://127.0.0.1:5500/index/index.html");
                        console.log($(".signin"))
                    }
                },
                error: function(error){
                    console.log(error);
                }
            })
        }
    })
  
})