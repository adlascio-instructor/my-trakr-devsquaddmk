import {
    addTransaction,
    getTransactions,
    renderTransaction,
    typeTransactionFilter
} from "./helpers/Transaction.js";
import {
    addCategory,
    categoriesFilter,
    getCategories,
    renderCategory,
    renderSavedCategories,
} from "./helpers/Category.js";

import { getIdSelectedAccount, getAccountsInfos } from "./helpers/Common.js";

import {
    getAccounts,
    addNewAccount,
    accountsFilter,
    showAllTransactions
} from "./helpers/Account.js";


$(async () => {
    getAccountsInfos();
    const categories = await getCategories();
    const accounts = await getAccounts();
    getIdSelectedAccount("#selectionAccounts");
    getIdSelectedAccount("#inputFromSelect");
    getIdSelectedAccount("#inputToSelect");
    renderSavedCategories(categories);
    getTransactions(accounts, categories);

    $("#accountForm").submit(event => {
        let inputAccountName = $(".inputAccount").val();
        if (inputAccountName === "" || inputAccountName === null || inputAccountName === undefined) {
            alert("Please enter a name!");
            return;
        } else {
            let loadedAccounts = $("#selectionAccounts").children();
            let accountExists = false;
            loadedAccounts.each((index, account) => {
                if (account.innerText.toLowerCase().trim()
                    === inputAccountName.toLowerCase().trim()) {
                    accountExists = true;
                }
            })
            if (accountExists) {
                alert("Account already exists!");
                return;
            } else {
                alert("Account added!");
                addNewAccount();
            }
        }
    })


    $("#transactionInputAmount").on("change", function () {
        let inputAmmount = $(this).val();
    });

    $("#transactionInputDescription").on("change", function () {
        let inputDescription = $(this).val();
    });

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
        showAllTransactions($("#transactionsContainer").siblings());
        let value = $(this).val();
        if (value === "newCategory") {
            $(".newCategoryContainer").css("display", "flex");
        } else {
            $(".newCategoryContainer").css("display", "none");
        }
    });

    $("#typesFilter").on("change", function () {
        showAllTransactions($("#transactionsContainer").siblings());
        let value = $(this).val();
        if (value === "user") {
            $("#filterByAccount").css("display", "flex");
            $("#filterByType").css("display", "none");
            $("#filterByCategory").css("display", "none");
        }
        if (value === "type") {
            $("#filterByType").css("display", "flex");
            $("#filterByAccount").css("display", "none");
            $("#filterByCategory").css("display", "none");
        }
        if (value === "category") {
            $("#filterByCategory").css("display", "flex");
            $("#filterByType").css("display", "none");
            $("#filterByAccount").css("display", "none");
        }
    })

    $("#filterByAccount").on("change", function () {
        showAllTransactions($("#transactionsContainer").siblings());
        let value = $(this).val();
        let transactionsOnScreen = $("#transactionsContainer").siblings();
        if (value === "default") {
            showAllTransactions(transactionsOnScreen);
        } else {
            accountsFilter(value, transactionsOnScreen);
        }
    })

    $("#filterByCategory").on("change", function () {
        showAllTransactions($("#transactionsContainer").siblings());
        let value = $(this).val();
        let transactionsOnScreen = $("#transactionsContainer").siblings();
        if (value === "default") {
            console.log("default");
            showAllTransactions(transactionsOnScreen);
        } else {
            console.log("not default");
            categoriesFilter(value, transactionsOnScreen);
        }
    })

    $("#filterByType").on("change", function () {
        showAllTransactions($("#transactionsContainer").siblings());
        let value = $(this).val();
        let transactionsOnScreen = $("#transactionsContainer").siblings();
        if (value === "default") {
            showAllTransactions(transactionsOnScreen);
        } else {
            typeTransactionFilter(value, transactionsOnScreen);
        }
    })

    $("#addTransactionInput").click(async function (event) {
        event.preventDefault();
        let postedTransaction = await addTransaction();
        renderTransaction(postedTransaction, accounts, categories);
    });

    $("#newCategoryButton").click(async function (event) {
        let inputCategoryName = $("#newCategoryName").val();
        if (inputCategoryName === "") {
            alert("Please enter a category name!");
            return;
        } else {
            let loadedCategories = $("#selectionCategory").children();
            let exists = false;
            loadedCategories.each((index, loadedCategory) => {
                if (
                    inputCategoryName.toLowerCase().trim() ===
                    loadedCategory.value.toLowerCase().trim()
                ) {
                    exists = true;
                }
            });
            if (exists) {
                alert("Category already exists!");
                return;
            } else {
                let newCategory = await addCategory(inputCategoryName);
                categories.push(newCategory);
                renderCategory(newCategory);
                $(".newCategoryContainer").css("display", "none");
                $("#selectionCategory").val("default");
                $("#newCategoryName").val("");
            }
        }
    });
});
