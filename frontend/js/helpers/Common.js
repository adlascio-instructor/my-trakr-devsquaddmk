export const getIdSelectedAccount = (element) => {
    let selectedId = 0;
    let accountSelections = $(element);
    accountSelections.on("change", function () {
        let value = $(this).children(":selected").attr("id");
        selectedId = value;
        return selectedId;
    });
};

export const getAccountsInfos = () => {
    $.ajax({
        method: "get",
        url: "http://localhost:3000/accounts",
    }).done((data) => {
        $.each(data, (index, value) => {
            // $("#selectionAccounts").append(
            //     `<option id="${value.id}" value="${value.username}">${value.username}</option>`
            // );
            // $(".fromToSelections").append(
            //     `<option id="${value.id}" value="${value.username}">${value.username}</option>`
            // );


            let updatedBalance = value.transactions.reduce((acc, transaction) => {
                if (transaction.type === "deposit") {
                    return acc + transaction.amount;
                } else if (transaction.type === "withdraw") {
                    return acc - transaction.amount;
                } else if (transaction.type === "transfer" && transaction.accountIdFrom === value.id) {
                    return acc - transaction.amount;
                } else if (transaction.type === "transfer" && transaction.accountIdTo === value.id) {
                    return acc + transaction.amount;
                }
            }, 0);

            $(".summaryAccounts").children("ul").append(`
                <li class="account" id=${value.id}>
                    <h3 class="account-name">${value.username}</h3>
                    <h3 class="balance">${updatedBalance}</h3>
                </li>`);

            $("#filterByAccount").append(
                `<option id="${value.id}" value="${value.username}">${value.username}</option>`
            )




        });
    });
};
