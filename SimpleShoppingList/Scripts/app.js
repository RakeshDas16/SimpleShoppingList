var currentList = {};

function createShoppingList() {
  
    currentList.name = $("#spListName").val();
    currentList.items = new Array();


    //Web Service Call
    $.ajax({
        type: "POST",
        datatype: "json",
        url: "api/ShoppingListsEF/",
        data: currentList,
        success: function (result) {
            currentList = result;
            showShoppingList();
            history.pushState({ id: result.id }, result.name, "?id=" + result.id);
         
        }
    });

   
}
function showShoppingList() {
    $("#shopListTitle").html(currentList.name);
    $("#shopListItems").empty();

    $("#createListDiv").hide();
    $("#shopListDiv").show();

    $('#newItemName').val("");
    $('#newItemName').focus();
    $('#newItemName').unbind("keyup");
    $("#newItemName").keyup(function (event) {
        if (event.keyCode == 13) {
            addItem();
        }

    });
}

function addItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    newItem.shoppingListId = currentList.id;

    $.ajax({
        type: "POST",
        datatype: "json",
        url: "api/ItemsEF",
        data: newItem,
        success: function (result) {
            currentList = result;

            drawItems();
            $("#newItemName").val("");

        }
    });


}

function drawItems() {
    var $list = $("#shopListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        console.info($li);
        var $deletBtn = $("<button onclick='deleteItem(" + currentItem.id + ")'>D<button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + currentItem.id + ")'>C<button>").appendTo($li);


        if (currentItem.checked) {
            $li.addClass("checked");
        }
        $li.appendTo($list);

    }

   

} function deleteItem(itemId) {
    $.ajax({
        type: "DELETE",
        datatype: "json",
        url: "api/ItemsEF/" + itemId,
        success: function (result) {
            currentList = result;

            drawItems();


        }
    });
}

function checkItem(itemId) {
   /* if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    }
    else {
        $("#item_" + index).addClass("checked");
    }*/

    var changedItem = {};

    for(var i = 0; i < currentList.items.length; i++)
    {
        if (currentList.items[i].id == itemId) {
            changedItem = currentList.items[i];
        }

    }

    changedItem.checked = !changedItem.checked;

    $.ajax({
        type: "PUT",
        datatype: "json",
        url: "api/ItemsEF/" + itemId,
        data: changedItem,
        success: function (result) {
            changedItem = result;

            drawItems();
           

        }
    });

}

function getShopListById(id) {

    $.ajax({
        type: "GET",
        datatype: "json",
        url: "api/ShoppingListsEF/" + id,
        success: function (result) {
            currentList = result;
            showShoppingList();
            drawItems();
        }
       

    });

}

function hideShoppingList() {
    $("#createListDiv").show();
    $("#shopListDiv").hide();

    $('#spListName').val("");
    $('#spListName').focus();
    $('#spListName').unbind("keyup");
    $("#spListName").keyup(function (event) {
        if (event.keyCode == 13) {
            createShoppingList();
        }

    });

}

$(document).ready(function() {
    console.info("ready");

    hideShoppingList();
   

    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");

    if (idIndex != -1) {
        getShopListById(pageUrl.substring(idIndex + 4));
    }

    window.onpopstate = function (event) {
        if (event.state == null) {
            hideShoppingList();
        }
        else {
            getShopListById(event.state.id);
        }
    }
});

