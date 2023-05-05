import { getNameCategory } from "./Category.js";
import { getNameAccount } from "./Account.js";

export const getTransactions = (accounts, categories) => {
    // console.log("inside");
    console.log("accounts", accounts);
    // console.log(categories);
    $.each(accounts, function (indexInArray, account) {
        $.each(account.transactions, function (indexInArray, transactions) {
            // console.log("Transactions", transactions);
            if (transactions.type === "transfer") {
                let categoryName = getNameCategory(
                    transactions.categoryId,
                    categories
                );
                let accountNameFrom = getNameAccount(
                    transactions.accountIdFrom,
                    accounts
                );
                let accountNameTo = getNameAccount(
                    transactions.accountIdTo,
                    accounts
                );
                $("tbody").append(`<tr class="addInformation">
                        <td>${transactions.id}</td>
                        <td>${account.username}</td>
                        <td>${transactions.type}</td>
                        <td>${categoryName}</td>
                        <td>${transactions.description}</td>
                        <td>${transactions.amount}</td>
                        <td>${accountNameFrom}</td>
                        <td>${accountNameTo}</td
                        </tr>`);
            } else {
                let categoryName = getNameCategory(
                    transactions.categoryId,
                    categories
                );
                let accountNameFrom = getNameAccount(
                    transactions.accountIdFrom,
                    accounts
                );
                let accountNameTo = getNameAccount(
                    transactions.accountIdFrom,
                    accounts
                );
                $("tbody").append(`<tr class="addInformation">
                        <td>${transactions.id}</td>
                        <td>${account.username}</td>
                        <td>${transactions.type}</td>
                        <td>${categoryName}</td>
                        <td>${transactions.description}</td>
                        <td>${transactions.amount}</td>
                        <td>N/A</td>
                        <td>N/A</td
                        </tr>`);
            }
        });
    });
};

export const addTransaction = () => {
    let inputTransaction = {
        accountId: 0,
        accountIdFrom: "null",
        accountIdTo: "null",
        type: "",
        amount: 0,
        categoryId: 0,
        description: "",
    };

    let inputTypeTransaction = $(".transactionsFieldset").children();

    inputTypeTransaction.each(function (index, fieldset) {
        if (
            fieldset.value === "deposit" ||
            (fieldset.value === "withdraw" && fieldset.checked)
        ) {
            inputTransaction.accountId = parseInt(
                $("#selectionAccounts").children(":selected").attr("id")
            );
            inputTransaction.type = fieldset.value;
            inputTransaction.amount = parseFloat(
                $("#transactionInputAmount").val()
            );
            inputTransaction.categoryId = parseInt(
                $("#selectionCategory").children(":selected").attr("id")
            );
            inputTransaction.description = $(
                "#transactionInputDescription"
            ).val();
        } else if (fieldset.value === "transfer" && fieldset.checked) {
            inputTransaction.accountId = "null";
            inputTransaction.type = fieldset.value;
            inputTransaction.amount = parseFloat(
                $("#transactionInputAmount").val()
            );
            inputTransaction.categoryId = parseInt(
                $("#selectionCategory").children(":selected").attr("id")
            );
            inputTransaction.description = $(
                "#transactionInputDescription"
            ).val();
            inputTransaction.accountIdFrom = parseInt(
                $("#inputFromSelect").children(":selected").attr("id")
            );
            inputTransaction.accountIdTo = parseInt(
                $("#inputToSelect").children(":selected").attr("id")
            );
        }
    });
    if (inputTransaction.type === "transfer") {
        if (inputTransaction.accountIdFrom === inputTransaction.accountIdTo) {
            alert("You can't transfer money to the same account!");
            return;
        }
        if (!inputTransaction.accountIdFrom || !inputTransaction.accountIdTo) {
            alert("Please select a from and to account!");
            return;
        }
        if (!inputTransaction.categoryId) {
            alert("Please select a category!");
            return;
        }
        if (!inputTransaction.amount || inputTransaction.amount < 0) {
            alert("Please enter an amount!");
            return;
        }
    }

    if (
        inputTransaction.type === "deposit" ||
        inputTransaction.type === "withdraw"
    ) {
        if (!inputTransaction.accountId) {
            alert("Please select an account!");
            return;
        }
        if (!inputTransaction.categoryId) {
            alert("Please select a category!");
            return;
        }
        if (!inputTransaction.amount || inputTransaction.amount < 0) {
            alert("Please enter an amount!");
            return;
        }
    }

    if (inputTransaction.type === "deposit") {
        let accountDestination = $(`.account#${inputTransaction.accountId}`);
        let balance = parseInt(accountDestination.children(".balance").text());
        let amount = parseInt(inputTransaction.amount);
        accountDestination.children(".balance").text(balance + amount);
    }

    if (inputTransaction.type === "withdraw") {
        let accountDestination = $(`.account#${inputTransaction.accountId}`);
        let balance = parseInt(accountDestination.children(".balance").text());
        let amount = parseInt(inputTransaction.amount);
        if (balance <= amount) {
            alert("You can't withdraw more than your balance!");
            return;
        } else {
            accountDestination.children(".balance").text(balance - amount);
        }
    }

    //transfer -> se o balance da conta onde for feita a subratracao for zero, não pode fazer transfer

    $.ajax({
        method: "post",
        data: {
            newTransaction: JSON.stringify({
                accountId: inputTransaction.accountId,
                accountIdFrom: inputTransaction.accountIdFrom,
                accountIdTo: inputTransaction.accountIdTo,
                type: inputTransaction.type,
                amount: inputTransaction.amount,
                categoryId: inputTransaction.categoryId,
                description: inputTransaction.description,
            }),
        },
        url: "http://localhost:3000/transactions",
        dataType: "json",
    }).done((data) => {
        console.log("data", data);
        alert("Transaction added!");
    });

    $("#transactionInputAmount").val("");
    $("#transactionInputDescription").val("");
    if ($(".fromTo").css("display") == "flex") {
        $(".fromToSelections").val("default");
    }
    $("#selectionCategory").val("default");
    $("#selectionAccounts").val("default");
};
