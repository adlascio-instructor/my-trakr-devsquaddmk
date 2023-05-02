$(document).ready(() => {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/accounts",
        dataType: "json",
    }).done((data) => {
        // console.log("data", data);
        $.each(data, function (indexInArray, accounts) {
            console.log("Accounts", accounts);
            // console.log("ArrayTransactions", accounts.transactions);
            $.each(
                accounts.transactions,
                function (indexInArray, transactions) {
                    console.log("Transactions", transactions);
                }
            );
        });
    });
});
