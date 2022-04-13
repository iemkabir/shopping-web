$(document).ready(function () {
  let item = sessionStorage.getItem("items");
  let items = JSON.parse(item);
  let CartData = items.data;
  let count = 0;
  let myObj = {};
  let user = sessionStorage.getItem("userAuth");
  let editOption = `<div style="width: 66%; text-align: end;">
  <p class='edit'>edit</p>
</div>`;

  // User Profile Interaction

  $(".UserMenu").click(function () {
    $(".UserMenu").each(function () {
      $(".UserMenu").removeClass("addCard");
    });

    $(this).addClass("addCard");
    let name = $(this).attr("id");

    $(".addressBox2").children().removeClass("hideElem");
    $(".addressBox2").siblings().addClass("hideElem");

    $(".tabList")
      .children()
      .each(function () {
        $(this).addClass("hideElem");
        if ($(this).hasClass(name)) {
          $(this).removeClass("hideElem");
        }
      });
  });

  // CHECKOUT PAGE JQUERY CODE

  // FUNCTION TO SHOW ADDRESS TO USER
  function ChooseADdress(BillingAddres) {
    for (let x = 0; x < BillingAddres.length; x++) {
      let elem = `<div class="row" style="margin-left: 20px;">
    <input class="addressRadiobtn" type="radio" name="" id="" style="float: left;">
    <p style="float: left;margin-top: -4px;margin-left: 15px;">
      <span>${BillingAddres[x].FirstName} ${BillingAddres[x].SurName}</span>,
      <span>${BillingAddres[x].PhoneNumber}</span>,
      <span>${BillingAddres[x].City}</span>,
      <span>${BillingAddres[x].Pincode}</span>,
      <span>${BillingAddres[x].State}</span>
    </p>
   </div>`;
      $(".checkOutAddressBox")
        .eq(1)
        .children()
        .eq(1)
        .addClass("toggleElemActive")
        .prepend(elem);
    }
    $(".checkOutAddressBox")
      .eq(2)
      .children()
      .eq(2)
      .removeClass("toggleElemActive")
      .addClass("toggleElem");
  }



  // CHECK IF USER HAS SELECTED ANY ADDRESS

  $("body").on("click", ".addressRadiobtn", function () {
    let clickedElem = $(this);
    $(".addressRadiobtn").each(function (index) {
      $(this).prop("checked", false);
    });

    $(this).prop("checked", true);
  });



  // CHECK IF PREVIOUSLY USER HAS SAVED ANY ADDRESS

  if (JSON.parse(user).user.length >= 1) {
    let elem = ChooseADdress(JSON.parse(user).user);
  } else {
    $(".checkOutAddressBox").eq(1).parent().css("display", "none");
    $(".checkOutAddressBox")
      .eq(2)
      .children()
      .eq(2)
      .removeClass("toggleElem")
      .addClass("toggleElemActive");
  }




  // SAVE ADDRESS AND PROCEED TO THE NEXT STEP

  $(".AdrsBtn").click(function () {
    count++;
    let y = 0;
    // IF CONDITION TO STOP FUNCTION TO REPEAT ON EVERY CLICK
    if (count === 1) {
      createCheckoutCart();
    }
    // CHECKING IF ALL REQUIRED INPUT FIELDS ARE FILLED AND VALID PHONE NUMBERS AND PINCODES
    $(".formElems")
      .find("input")
      .each(function () {
        if (
          $(this).val() != "" &&
          $(this).attr("placeholder") != "Email Address"
        ) {
          if (
            $(this).attr("name") == "Pincode" &&
            new RegExp("^[1-9][0-9]{5}$").test($(this).val()) == false
          ) {
            $(this).css("border", "2px Solid Red");
            $(this).val("");
            return;
          } else if (
            $(this).attr("name") == "PhoneNumber" &&
            new RegExp("^[6-9][0-9]{9}$").test($(this).val()) == false
          ) {
            $(this).css("border", "2px Solid Red");
            $(this).val("");
            return;
          }
          y++;
        }
        myObj[$(this).attr("name")] = $(this).val();
      });

    //  IF EVERY REQUIRED FIELD IS FILLED MAKING A API CALL TO SAVE DATA
    if (y >= 7 && Object.keys(myObj).length >= 7) {
      PostAddress(myObj);
      // FUNCTION TO ADD AND REMOVE CLASSESS
      addOrRemoveClass(
        $(this).parent(),
        $(".checkOutBoxContainer").find("i").eq(3).parent().siblings()
      );
    }
  });





  // FUNCTION TO ADD AND REMOVE CLASSESS
  function addOrRemoveClass(currentElem, nextElem) {
    nextElem.addClass("toggleElemActive").removeClass("toggleElem");
    currentElem.addClass("toggleElem").removeClass("toggleElemActive");
  }



  // FUNCTION TO ADD CARTS ITEM AT CHECKOUT OAGE

  function createCheckoutCart() {
    console.log(CartData);
    for (let x = 0; x < CartData.length; x++) {
      let elem = `<div class="row " style="padding: 14px;">
       <div class="col-sm-4">
                <div>
                  <img class="img-thumbnail"
                    src="${CartData[x].image}"
                    alt="">
                </div>
              </div>

              <div class="col-sm-8" style="color: black;">
                <div>
                  <h5 style="font-size: 15px">${CartData[x].ProductName}</h5>
                </div>
                <div>
                  <h5 style="font-size: 15px">${CartData[x].Category}</h5>
                </div>
                <div>
                  <h5 style="font-size: 15px">${CartData[x].price}</h5>
                </div>
                <div>
                  <button class="btn btn-dark checkOutRemove"> Remove</button>
                </div>
                <div class="bottomELemConatiner">
                  <div class="increDecre" style="height:28px;">
                    <div class="countMinus">
                      <i class="fa-solid fa-minus"></i>
                    </div>
                    <div>
                      <p style="    padding: 1px 31px 1px 31px;
                      border: 1px solid;">2</p>
                    </div>
                    <div class="countPlus">
                      <i class="fa-solid fa-plus"></i>
                    </div>
                  </div>
                </div>
              </div>
              </div>`;

      $(".cartElemContainer").append(elem);
    }

    $(".cartElemContainer").append(
      "<button class='placeOrderBtn'>NEXT</button>"
    );
  }



  // INCREASING AND DECREASING QUANTITIES
  $("body").on("click", ".countMinus", function () {
    if ($(".increDecre").find("p").text() == 1) {
      return;
    } else {
      let newVal = $(".increDecre").find("p").text() - 1;
      $(".increDecre").find("p").text(newVal);
    }
  }),
    $("body").on("click", ".countPlus", function () {
      let newVal = parseInt($(".increDecre").find("p").text());
      $(".increDecre")
        .find("p")
        .html(newVal + 1);
    });



    // FUNCTION TO POST THE NEWLY ADDED ADDRESS TO DATABSE

  function PostAddress(myObj) {
    $.ajax({
      url: "http://localhost:4000/api/user/Address",
      type: "POST",
      datatype: "application/json",
      data: myObj,
      headers: { Authorization: `Bearer ${JSON.parse(user).token}` },
      success: function (data) {
        if (data) {
          console.log(data);
        }
      },
      error: function (err) {
        console.log("okeyb", err);
      },
    });
  }



});
