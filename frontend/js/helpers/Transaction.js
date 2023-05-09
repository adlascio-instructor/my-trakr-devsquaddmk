import { getNameCategory } from "./Category.js";
import { getNameAccount } from "./Account.js";
import { notificationAnimation } from "../index.js";

export const getTransactions = (accounts, categories) => {
    $.ajax({
        method: "get",
        url: "http://localhost:3000/transactions",
    }).done((data) => {
        console.log("data", data);

        let organizedTransactions = data.flat().sort((a, b) => a.id - b.id);

        $.each(organizedTransactions, (index, transaction) => {
            if (transaction.type === "transfer") {
                let categoryName = getNameCategory(
                    transaction.categoryId,
                    categories
                );
                let accountNameFrom = getNameAccount(
                    transaction.accountIdFrom,
                    accounts
                );
                let accountNameTo = getNameAccount(
                    transaction.accountIdTo,
                    accounts
                );
                let username = getNameAccount(
                    transaction.accountId,
                    accounts
                )
                $("tbody").append(`<tr class="transactionsInfo" id=${transaction.id}>
                        <td>${transaction.id}</td>
                        <td>${username}</td>
                        <td>${transaction.type}</td>
                        <td>${categoryName}</td>
                        <td>${transaction.description}</td>
                        <td>${transaction.amount}</td>
                        <td>${accountNameFrom}</td>
                        <td>${accountNameTo}</td
                        </tr>`);

            } else {
                let categoryName = getNameCategory(
                    transaction.categoryId,
                    categories
                );
                let username = getNameAccount(
                    transaction.accountId,
                    accounts
                )
                $("tbody").append(`<tr class="transactionsInfo"id=${transaction.id}>
                        <td>${transaction.id}</td>
                        <td>${username}</td>
                        <td>${transaction.type}</td>
                        <td>${categoryName}</td>
                        <td>${transaction.description}</td>
                        <td>${transaction.amount}</td>
                        <td>N/A</td>
                        <td>N/A</td
                        </tr>`);
            }
        });
    });
}



export const renderTransaction = (transactions, accounts, categories) => {
    $.each(transactions, function (indexInArray, transaction) {
        if (transaction.type === "transfer") {
            let categoryName = getNameCategory(
                transaction.categoryId,
                categories
            );
            let accountNameFrom = getNameAccount(
                transaction.accountIdFrom,
                accounts
            );
            let accountNameTo = getNameAccount(
                transaction.accountIdTo,
                accounts
            );
            let account = getNameAccount(transaction.accountId, accounts);
            $("tbody").append(`<tr class="transactionsInfo" id=${transaction.id}>
                        <td>${transaction.id}</td>
                        <td>${account}</td>
                        <td>${transaction.type}</td>
                        <td>${categoryName}</td>
                        <td>${transaction.description}</td>
                        <td>${transaction.amount}</td>
                        <td>${accountNameFrom}</td>
                        <td>${accountNameTo}</td
                        </tr>`);
        } else {
            let categoryName = getNameCategory(
                transaction.categoryId,
                categories
            );
            let accountNameFrom = getNameAccount(
                transaction.accountIdFrom,
                accounts
            );
            let accountNameTo = getNameAccount(
                transaction.accountIdFrom,
                accounts
            );
            let account = getNameAccount(transaction.accountId, accounts);
            $("tbody").append(`<tr class="transactionsInfo" id=${transaction.id}>
                        <td>${transaction.id}</td>
                        <td>${account}</td>
                        <td>${transaction.type}</td>
                        <td>${categoryName}</td>
                        <td>${transaction.description}</td>
                        <td>${transaction.amount}</td>
                        <td>N/A</td>
                        <td>N/A</td
                        </tr>`);
        }
    })
}

export const addTransaction = async () => {
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
            notificationAnimation("Please select different accounts!", "orange");
            return;
        }
        if (!inputTransaction.accountIdFrom || !inputTransaction.accountIdTo) {
            notificationAnimation("Please select an account!", "orange");
            return;
        }
        if (!inputTransaction.categoryId) {
            notificationAnimation("Please select a category!", "orange");
            return;
        }
        if (!inputTransaction.amount || inputTransaction.amount < 0) {
            notificationAnimation("Please enter an amount!", "orange");
            return;
        }
    }

    if (
        inputTransaction.type === "deposit" ||
        inputTransaction.type === "withdraw"
    ) {
        if (!inputTransaction.accountId) {
            notificationAnimation("Please select an account!", "orange");
            return;
        }
        if (!inputTransaction.categoryId) {
            notificationAnimation("Please select a category!", "orange");
            return;
        }
        if (!inputTransaction.amount || inputTransaction.amount < 0) {
            notificationAnimation("Please enter an amount!", "orange");
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
        if (balance < amount) {
            notificationAnimation("You can't withdraw more than your balance!", "orange");
            return;
        } else {
            accountDestination.children(".balance").text(balance - amount);
        }
    }

    if (inputTransaction.type === "transfer") {
        let accountFrom = $(`.account#${inputTransaction.accountIdFrom}`)
        let accountTo = $(`.account#${inputTransaction.accountIdTo}`)
        let balanceFrom = parseInt(accountFrom.children(".balance").text());
        let balanceTo = parseInt(accountTo.children(".balance").text());
        let amount = parseInt(inputTransaction.amount);
        if (balanceFrom < amount) {
            notificationAnimation("You can't transfer more than your balance!", "orange");
            return
        } else {
            accountFrom.children(".balance").text(balanceFrom - amount);
            accountTo.children(".balance").text(balanceTo + amount);
        }
    }

    return $.ajax({
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
        $("#transactionInputAmount").val("");
        $("#transactionInputDescription").val("");
        if ($(".fromTo").css("display") == "flex") {
            $(".fromToSelections").val("default");
        }
        $("#selectionCategory").val("default");
        $("#selectionAccounts").val("default");

        notificationAnimation("Transaction added successfully!", "green");
        return data

    });

};

export const typeTransactionFilter = (type, transactionsOnScreen) => {
    transactionsOnScreen.each((index, transaction) => {
        let transactionAccount = transaction.children[2].innerText;
        if (transactionAccount === type) {
            $(transaction).css("display", "flex");
        } else {
            $(transaction).css("display", "none");
        }
    });
}
