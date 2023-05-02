export const getIdSelectedAccount = (element) => {
    let selectedId = 0;
    let accountSelections = $(element)
    accountSelections.on("change", function () {
        let value = $(this).children(":selected").attr("id");
        selectedId = value;
        return selectedId;
    });
}


export const getAccounts = () => {
    $.ajax({
        method: "get",
        url: "http://localhost:3000/accounts",
    }).done((data) => {
        $.each(data, (index, value) => {
            $("#selectionAccounts").append(
                `<option id="${value.id}" value="${value.username}">${value.username}</option>`
            )
            $(".fromToSelections").append(
                `<option id="${value.id}" value="${value.username}">${value.username}</option>`
            )
        });
    });
}