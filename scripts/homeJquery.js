



$('.linkCollapsible').on('click',function(e){
    e.preventDefault();
    var nextDiv = $(this).parent().next(".collapsibleContent");
    if (nextDiv.is(':visible')){
        nextDiv.hide();
    }
    else{
        nextDiv.show();
    }
})
