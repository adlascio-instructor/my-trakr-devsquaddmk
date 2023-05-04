import { getNameCategory } from "./Category.js";

$(document).ready(() => {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/accounts",
        dataType: "json",
    }).done((data) => {
        console.log("data", data);
        $.each(data, function (indexInArray, accounts) {
            console.log("Accounts", accounts);
            $.each(
                accounts.transactions,
                function (indexInArray, transactions) {
                    console.log("Transactions", transactions);
                    if (transactions.type === "transfer") {
                        $("#transInformation").append(`<tr>
                        <td>${transactions.id}</td>
                        <td>${accounts.username}</td>
                        <td>${transactions.type}</td>
                        <td>"Category"</td>
                        <td>${transactions.description}</td>
                        <td>${transactions.amount}</td>
                        <td>${transactions.accountIdFrom}</td>
                        <td>${transactions.accountIdTo}</td
                        </tr>`);
                    } else {
                        $("#transInformation").append(`<tr>
                        <td>${transactions.id}</td>
                        <td>${accounts.username}</td>
                        <td>${transactions.type}</td>
                        <td>"Category"</td>
                        <td>${transactions.description}</td>
                        <td>${transactions.amount}</td>
                        <td>N/A</td>
                        <td>N/A</td
                        </tr>`);
                    }
                }
            );
        });

        let test = getNameCategory(1);
        console.log("testCategoryByID", test);
    });
});
