$(document).ready(function () {
  let current, next, previous;
  let checkNum = "^[6-9]d{9}$";
  let checkPin = "^[1-9][0-9]{5}$";
  $(".next").click(function () {
    current = $(this).parent();
    next = $(this).parent().next();
    current.hide();
    next.show();
    $("#progressbar li").eq($("fieldset").index(next)).addClass("active");
  });

  $(".previous").click(function () {
    current = $(this).parent();
    previous = $(this).parent().prev();
    current.hide();
    previous.show();
    $("#progressbar li").eq($("fieldset").index(current)).removeClass("active");
  });

  /* $(".SaveAdd").click(function () {
    let check = true;
    $(".form-outline :input").each(function () {
      if ($(this).val() == "") {
        check = false;
      }
    });
    if (check == false) {
      $("form")
        .prepend(`<div class="alert alert-secondary myAlert" role="alert">
    All Fields Are Required
   </div>`);
      setTimeout(() => {
        $(".myAlert").remove();
      }, 2000);
    }
  }); */
});
