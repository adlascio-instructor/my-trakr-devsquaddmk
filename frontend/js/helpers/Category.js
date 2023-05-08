export const getCategories = () => {
    return $.ajax({
        method: "get",
        url: "http://localhost:3000/categories",
    }).done((categories) => {
        const savedCategories = [];
        $.each(categories, (index, value) => {
            savedCategories.push({
                id: value.id,
                category: value.name,
            });
        });
        return savedCategories;
    });
};

export const getNameCategory = (id, categories) => {
    let name = "";
    $.each(categories, (index, value) => {
        if (id === value.id) {
            name = value.name;
        }
    });
    return name;
};

export const addCategory = (category) => {
    return $.ajax({
        method: "post",
        url: "http://localhost:3000/categories",
        data: {
            newCategory: category,
        },
    }).done((data) => {
        alert("Category added!");
        return data;
    });
};

export const renderCategory = (category) => {
    $("#selectionCategory").append(
        `<option id="${category.id}" value="${category.name}">${category.name}</option>`
    );

    $("#filterByCategory").append(
        `<option id="${category.id}" value="${category.name}">${category.name}</option>`
    )
};

export const renderSavedCategories = (categories) => {
    $.each(categories, (index, category) => {
        renderCategory(category);
    });
};

export const categoriesFilter = (category, transactionsOnScreen) => {
    transactionsOnScreen.each((index, transaction) => {
        let transactionAccount = transaction.children[3].innerText;
        if (transactionAccount === category) {
            $(transaction).css("display", "flex");
        } else {
            $(transaction).css("display", "none");
        }
    });
}

