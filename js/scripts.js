$(document).ready(function(){

//bootstrap
$('.carousel').carousel()


$('.nav-tabs li a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})

});
