import { addTransaction, getTransactions } from "./helpers/Transaction.js";
import {
    addCategory,
    getCategories,
    renderCategory,
    renderSavedCategories,
} from "./helpers/Category.js";

import { getIdSelectedAccount, getAccountsOptions } from "./helpers/Common.js";

import { getAccounts, addNewAccount } from "./helpers/Account.js";

import { getIdSelectedAccount, getAccountsOptions } from "./helpers/Common.js";

$(async () => {
    getAccountsOptions();
    const categories = await getCategories();
    const accounts = await getAccounts();

    console.log("savedAccounts", accounts);

    // getTransactions(accounts, categories);
    getIdSelectedAccount("#selectionAccounts");
    getIdSelectedAccount("#inputFromSelect");
    getIdSelectedAccount("#inputToSelect");

    renderSavedCategories(categories);

    $("#accountForm").submit((event) => {
        addNewAccount();
    });

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

    $("#addTransactionInput").click(function (event) {
        event.preventDefault();
        addTransaction();
        getTransactions(accounts, categories);
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
