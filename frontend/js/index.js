import {
    addTransaction,
    getTransactions,
    renderTransaction
} from "./helpers/Transaction.js";
import {
    addCategory,
    getCategories,
    renderCategory,
    renderSavedCategories,
} from "./helpers/Category.js";

import { getIdSelectedAccount, getAccountsInfos } from "./helpers/Common.js";

import {
    getAccounts,
    addNewAccount,
    accountsFilter
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
        addNewAccount();
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
        let value = $(this).val();
        if (value === "newCategory") {
            $(".newCategoryContainer").css("display", "flex");
        } else {
            $(".newCategoryContainer").css("display", "none");
        }
    });

    $("#filterByAccount").on("change", function () {
        let value = $(this).val();
        let transactionsOnScreen = $("#transactionsContainer").siblings();
        accountsFilter(value, transactionsOnScreen);


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
            }
        }
    });
});
