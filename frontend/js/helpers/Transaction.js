$(() => {



    const getAccounts = () => {
        $.ajax({
            method: "get",
            url: "http://localhost:3000/accounts",
        }).done((data) => {
            $.each(data, (index, value) => {

                $("#selectionAccounts").append(
                    `<option value="${value.username}">${value.username}</option>`
                )
                $(".fromToSelections").append(
                    `<option value="${value.username}">${value.username}</option>`
                )
            });
        });
    }

    const getCategories = () => {
        $.ajax({
            method: "get",
            url: "http://localhost:3000/categories",
        }).done((categories) => {
            $.each(categories, (index, value) => {

                let loadedCategories = $("#selectionCategory").children();
                $.each(loadedCategories, (index, loadedCategory) => {
                    console.log("loadedCategory", loadedCategory.value);
                    if (loadedCategory.value === value.name) {
                        console.log("value.name", value.name);
                        alert("Category already exists!");
                        return;
                    } else {
                        $("#selectionCategory").append(
                            `<option value="${value.name}">${value.name}</option>`
                        )
                    }

                })
            })
            console.log("categories", categories);

            let loadedCategories = $("#selectionCategory").children();
            $.each(loadedCategories, (index, value) => {
                console.log("value", value.value);
            })
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



    getAccounts();
    getCategories();







    $("#transferTransaction").click(() => {
        if ($("#transferTransaction").is(":checked")) {
            if ($(".fromTo").css("display") == "flex") {
                return;
            } else {
                $(".fromTo").css("display", "flex");
                $(".accountSelect").css("display", "none");
                // console.log("transferTransaction");
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
        console.log("addTransactionButton");
    });

    $("#newCategoryButton").click(function (event) {
        let inputCategoryName = $("#newCategoryName").val();
        console.log("newCategoryButton");

        addCategory(inputCategoryName);


        // $(".newCategoryContainer").css("display", "none");


        // addCategory("PEDRO");
        // getCategories();
        // alert("New category added!");
    });




});
