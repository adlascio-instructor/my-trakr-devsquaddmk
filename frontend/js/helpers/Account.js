$(document).ready(() => {

    const getAccounts = () => {
    //Getting the Accounts from the server and showing them on the Accounts Summary
    $.ajax({
        method: "get",
        url: "http://localhost:3000/accounts",
    }).done((accounts) => {
        //console.log("accounts", accounts);
        $.each(accounts, (index, account) => {
            //console.log("account", account);

            $(".summaryAccounts").children("ul").append(`
            <li class="account">
              <h3 class="account-name">${account.username}</h3>
              <h3 class="balance"></h3>
            </li>`);
        })
    });
    }


    //---------------------------------------------
    //Posting the new Accounts on the server

    const addNewAccount = () => {
    $("#accountForm").submit(event => {
        
        const inputAccount = $(".inputAccount").val();
        $.ajax({
            method: "post",
            data: {
              newAccount: inputAccount,
                },
            url: "http://localhost:3000/accounts",
            dataType: "json",
        }).done((data) => {
            console.log("account data", data);
        })
    })
    }
    //-----------------------------------------------


    //Getting the Accounts by ID

   const getAccountsById = () => {

    $.ajax({
        method: "get",
    url: "http://localhost:3000/accounts",
}).done((accounts) => {
    const savedAccounts = [];
    $each(accounts, (index, account) => {
        savedAccounts.push({
            id: account.id,
            name: account.username,
            balance: 0
        })
    })
})
}
//-----------------------------------------------------

const getNameAccount = (id, accounts) => {
    let name = "";
    $.each(nameAccountsArray, (index, value) => {
        if (id === value.id) {
            name = value.username
        }
    })
    return name;
}

    getAccounts();
    addNewAccount();
    getAccountsById();
    getNameAccount();
    })

    
