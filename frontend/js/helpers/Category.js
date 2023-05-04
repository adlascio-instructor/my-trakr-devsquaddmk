// let nameCategoriesObject = [];

export const getCategories = () => {
    return $.ajax({
        method: "get",
        url: "http://localhost:3000/categories",
    }).done((categories) => {
        const savedCategories = [];
        $("#selectionCategory").empty();
        $("#selectionCategory").append(
            `<option value="default" selected disabled>Select a category</option>
                    <option value="newCategory">+ New Category</option>`
        );
        $.each(categories, (index, value) => {
            $("#selectionCategory").append(
                `<option id="${value.id}" value="${value.name}">${value.name}</option>`
            );
            // if (
            //     nameCategoriesObject.find((element) => element.id === value.id)
            // ) {
            //     return;
            // } else {
            //     nameCategoriesObject.push({
            //         id: value.id,
            //         category: value.name,
            //     });
            // }
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
    // const categories = [];
    // console.log("objects", categories);
    $.each(categories, (index, value) => {
        console.log("value", value);
        if (id === value.id) {
            console.log("inputID", id);
            console.log("objValue", value.id);
            name = value.category;
        }
    });
    console.log("nameFinal", name);
    return name;
};

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
};
