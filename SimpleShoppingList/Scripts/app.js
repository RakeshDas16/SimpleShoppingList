var currentList = {};

function createShoppingList() {
    currentList.name = $("#spListName").val();
    currentList.items = new Array();
    //Web Service Call

    showShoppingList();
}
function showShoppingList() {
    $("#shopListTitle").html(currentList.name);
    $("#shopListItems").empty();

    $("#createListDiv").hide();
    $("#shopListDiv").show();

    $('#newItemName').focus();
    $("#newItemName").keyup(function (event) {
        if (event.keyCode == 13) {
            addItem();
        }

    });
}

function addItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    currentList.items.push(newItem);
    console.info(currentList);

    drawItems();
    $("#newItemName").val("");
}

function drawItems() {
    var $list = $("#shopListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        console.info($li);
        var $deletBtn = $("<button onclick='deleteItem(" + i + ")'>D<button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + i +")'>C<button>").appendTo($li);

        $li.appendTo($list);

    }
} function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    }
    else {
        $("#item_" + index).addClass("checked");
    }
}

function getShopListById(id) {

    console.info(id);
    currentList.name = "Mock Shopping List";
    currentList.items = [
        { name: "Milk" },
        { name: "Chocolate" },
        { name: "Strawberries" }
    ];

    showShoppingList();
    drawItems();
}
$(document).ready(function() {
    console.info("ready");
    $('#spListName').focus();
    $("#spListName").keyup(function (event) {
        if (event.keyCode == 13) {
            createShoppingList();
        }

    });

    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");

    if (idIndex != -1) {
        getShopListById(pageUrl.substring(idIndex + 4));
    }
});

