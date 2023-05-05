export const getAccounts = () => {
    //Getting the Accounts from the server and showing them on the Accounts Summary
    return $.ajax({
        method: "get",
        url: "http://localhost:3000/accounts",
    }).done((accounts) => {
        $.each(accounts, (index, account) => {
            renderAccounts(account);
            const savedAccounts = [];
            savedAccounts.push({
                id: account.id,
                name: account.username,
                balance: 0,
            });
        });
    });
};

//---------------------------------------------
//Posting the new Accounts on the server

export const addNewAccount = () => {
    $("#accountForm").submit((event) => {
        const inputAccount = $(".inputAccount").val();
        event.preventDefault();
        console.log("CLICK");

        $.ajax({
            method: "post",
            data: {
                newAccount: inputAccount,
            },
            url: "http://localhost:3000/accounts",
            dataType: "json",
        }).done((account) => {
            event.preventDefault();
            renderAccounts(account);
        });
    });
};

export const renderAccounts = (account) => {
    $(".summaryAccounts").children("ul").append(`
        <li class="account">
          <h3 class="account-name">${account.username}</h3>
          <h3 class="balance">0</h3>
        </li>`);
};
//-----------------------------------------------

//Getting the Accounts by ID

//-----------------------------------------------------

export const getNameAccount = (id, accounts) => {
    let name = "";
    $.each(accounts, (index, value) => {
        if (id === value.id) {
            name = value.username;
        }
    });
    return name;
};

//-----------------------------------------------------
