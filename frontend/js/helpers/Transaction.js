$(() => {



    const getAccounts = () => {
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

    const getCategories = () => {
        $.ajax({
            method: "get",
            url: "http://localhost:3000/categories",
        }).done((categories) => {
            $("#selectionCategory").empty();
            $("#selectionCategory").append(
                `<option value="" selected disabled>Select a category</option>
                    <option value="newCategory">+ New Category</option>`
            );
            $.each(categories, (index, value) => {
                $("#selectionCategory").append(
                    `<option id="${value.id}" value="${value.name}">${value.name}</option>`
                )
            });

        });
    }

    const addCategory = (category) => {
        $.ajax({
            method: "post",
            url: "http://localhost:3000/categories",
            data: {
                newCategory: category,
            },
        }).done((data) => {
            console.log("data", data);
        });
    }

    const getTransactions = () => {
        let transactions = [];
        $.ajax({
            method: "get",
            url: "http://localhost:3000/transactions",
        }).done((data) => {
            $.each(data, (index, value) => {
                transactions.push(value);
            });
        });
        return transactions;
    }

    const addTransaction = (transaction) => {
        let inputTransaction = {
            accountId: 0,
            accountIdFrom: "null",
            accountIdTo: "null",
            type: "",
            amount: 0,
            categoryId: 0,
            description: ""
        };

        let inputTypeTransaction = $(".transactionsFieldset").children();


        inputTypeTransaction.each(function (index, fieldset) {
            if (fieldset.value === "deposit" || fieldset.value === "withdraw" && fieldset.checked) {
                inputTransaction.accountId = parseInt($("#selectionAccounts").children(":selected").attr("id"));
                inputTransaction.type = fieldset.value;
                inputTransaction.amount = parseFloat($("#transactionInputAmount").val());
                inputTransaction.categoryId = parseInt($("#selectionCategory").children(":selected").attr("id"));
                inputTransaction.description = $("#transactionInputDescription").val();
            }
            else if (fieldset.value === "transfer" && fieldset.checked) {
                inputTransaction.accountId = "null"
                inputTransaction.type = fieldset.value;
                inputTransaction.amount = parseFloat($("#transactionInputAmount").val());
                inputTransaction.categoryId = parseInt($("#selectionCategory").children(":selected").attr("id"));
                inputTransaction.description = $("#transactionInputDescription").val();
                inputTransaction.accountIdFrom = parseInt($("#inputFromSelect").children(":selected").attr("id"));
                inputTransaction.accountIdTo = parseInt($("#inputToSelect").children(":selected").attr("id"));

            }
        })
        // for (const key in inputTransaction) {
        //     console.log(key, inputTransaction[key]);
        // }

        if (inputTransaction.type === "transfer") {
            console.log(inputTransaction.categoryId);
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

        if (inputTransaction.type === "deposit" || inputTransaction.type === "withdraw") {
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


        console.log("Ready for POST: ");
        console.log(typeof inputTransaction);

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
                    description: inputTransaction.description
                })
            }
            ,
            url: "http://localhost:3000/transactions",
            dataType: "json",
        }).done((data) => {
            console.log("data", data);
        })





    }




    // $.post(
    //     "http://localhost:3000/transactions",
    //     {
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json",
    //         data: JSON.stringify({
    //             newTransaction: {
    //                 accountId: 1,
    //                 accountIdFrom: null,
    //                 accountIdTo: null,
    //                 type: "deposit",
    //                 amount: 1233,
    //                 categoryId: 1,
    //                 description: "Description"
    //             }
    //         })
    //     }
    // ).done((data) => {
    //     console.log("data", data);
    // })

    // $.ajax({
    //     method: "post",
    //     data: {
    //         newAccount: "Diogo",
    //     },
    //     url: "http://localhost:3000/accounts",
    //     dataType: "json",
    // }).done((data) => {
    //     console.log("data", data);
    // })

    // $.ajax({
    //     method: "post",
    //     data: {
    //         newTransaction: JSON.stringify({
    //             accountId: 1,
    //             accountIdFrom: null,
    //             accountIdTo: null,
    //             type: "deposit",
    //             amount: 1233,
    //             categoryId: 1,
    //             description: "Description"
    //         })
    //     }
    //     ,
    //     url: "http://localhost:3000/transactions",
    //     dataType: "json",
    // }).done((data) => {
    //     console.log("data", data);
    // })





    const getIdSelectedAccount = (element) => {
        let selectedId = 0;
        let accountSelections = $(element)
        accountSelections.on("change", function () {
            let value = $(this).children(":selected").attr("id");
            selectedId = value;
            console.log("selectedId", selectedId);
            return selectedId;
        });
    }



    $("#transactionInputAmount").on("change", function () {
        let inputAmmount = $(this).val();
        console.log("inputAmmount", inputAmmount);
    });

    $("#transactionInputDescription").on("change", function () {
        let inputDescription = $(this).val();
        console.log("inputDescription", inputDescription);
    })






    getAccounts();
    getCategories();
    getTransactions();
    getIdSelectedAccount("#selectionAccounts");
    getIdSelectedAccount("#inputFromSelect");
    getIdSelectedAccount("#inputToSelect");












    $("#transferTransaction").click(() => {
        if ($("#transferTransaction").is(":checked")) {
            if ($(".fromTo").css("display") == "flex") {
                return;
            } else {
                $(".fromTo").css("display", "flex");
                $(".accountSelect").css("display", "none");
            }
        }
    });

    $(".inputTransaction").click(() => {
        console.log("inputs", $("inputTransaction").children());
        if ($(".inputTransaction").is(":checked")) {
            if ($(".accountSelect").css("display") == "flex") {
                return;
            } else {
                $(".accountSelect").css("display", "flex");
                $(".fromTo").css("display", "none");
            }
        }
    });

    $("#selectionCategory").on("change", function () {
        let value = $(this).val();
        if (value === "newCategory") {
            $(".newCategoryContainer").css("display", "flex");
        } else {
            $(".newCategoryContainer").css("display", "none");
        }
    });

    $("#addTransactionInput").click(function (event) {
        event.preventDefault();
        console.log("addTransactionButton");
        addTransaction();
    });

    $("#newCategoryButton").click(function (event) {
        let inputCategoryName = $("#newCategoryName").val();
        console.log("newCategoryButton");
        console.log("inputCategoryName", inputCategoryName);
        if (inputCategoryName === "") {
            alert("Please enter a category name!");
            return;
        } else {
            let loadedCategories = $("#selectionCategory").children();
            let exists = false;
            loadedCategories.each((index, loadedCategory) => {
                if (inputCategoryName.toLowerCase().trim() === loadedCategory.value.toLowerCase().trim()) {
                    exists = true;
                }
            })

            if (exists) {
                alert("Category already exists!");
                return;
            } else {

                addCategory(inputCategoryName);
                getCategories();
                $(".newCategoryContainer").css("display", "none");
            }
        }
    });
});
