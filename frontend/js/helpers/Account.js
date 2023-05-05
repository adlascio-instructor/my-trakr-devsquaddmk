export const getAccounts = () => {
    return $.ajax({
        method: "get",
        url: "http://localhost:3000/accounts",
    }).done((accounts) => {
        console.log("coming from the server", accounts);
        const savedAccounts = [];
        $.each(accounts, (index, account) => {
            savedAccounts.push({
                id: account.id,
                name: account.username,
                balance: 0,
            });
        });
        return savedAccounts;
    });
}

export const addNewAccount = () => {
    const inputAccount = $(".inputAccount").val();
    if (inputAccount === "" || inputAccount === undefined) {
        alert("Please enter a name for the account!")
        return;
    }
    $.ajax({
        method: "post",
        data: {
            newAccount: inputAccount,
        },
        url: "http://localhost:3000/accounts",
        dataType: "json",
    }).done((account) => {
        renderAccounts(account);
    });
};

export const renderAccounts = (account) => {
    $(".summaryAccounts").children("ul").append(`
        <li class="account" id=${account.id}>
          <h3 class="account-name">${account.username}</h3>
          <h3 class="balance">0</h3>
        </li>`);
};

export const getNameAccount = (id, accounts) => {
    let name = "";
    $.each(accounts, (index, value) => {
        if (id === value.id) {
            name = value.username;
        }
    });
    return name;
};
