export const getTransactions = (accounts, categories) => {
    // let transactions = [];
    // $.ajax({
    //     method: "get",
    //     url: "http://localhost:3000/transactions",
    // }).done((data) => {
    //     $.each(data, (index, value) => {
    //         transactions.push(value);
    //     });
    // });
    // return transactions;
};

export const addTransaction = (transaction) => {
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

}

