export const getCategories = () => {
    $.ajax({
        method: "get",
        url: "http://localhost:3000/categories",
    }).done((categories) => {
        $("#selectionCategory").empty();
        $("#selectionCategory").append(
            `<option value="default" selected disabled>Select a category</option>
                    <option value="newCategory">+ New Category</option>`
        );
        $.each(categories, (index, value) => {
            $("#selectionCategory").append(
                `<option id="${value.id}" value="${value.name}">${value.name}</option>`
            )
        });

    });
}

export const addCategory = (category) => {
    $.ajax({
        method: "post",
        url: "http://localhost:3000/categories",
        data: {
            newCategory: category,
        },
    }).done((data) => {
        $("#newCategoryName").val("");
        alert("Category added!");
    });
}