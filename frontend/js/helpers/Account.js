$(document).ready(() => {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/accounts",
        dataType: "json",
    }).done((data) => {
        console.log(data);
    });
});
