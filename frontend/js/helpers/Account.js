
export const getAccounts = () => {
    return $.ajax({
        method: "get",
        url: "http://localhost:3000/accounts",
    }).done((accounts) => {
        const savedAccounts = [];
        $.each(accounts, (index, account) => {
            renderAccounts(account)
            
        })
    });
    }


    //---------------------------------------------
    //Posting the new Accounts on the server

    const addNewAccount = () => {
    $("#accountForm").submit(event => {
        
        const inputAccount = $(".inputAccount").val();
        
        return $.ajax({
            method: "post",
            data: {
              newAccount: inputAccount,
                },
            url: "http://localhost:3000/accounts",
            dataType: "json",
        }).done((account) => {
            renderAccounts(account);
            const savedAccounts = [];
            savedAccounts.push({
            id: account.id,
            name: account.username,
            balance: 0
        })
        return savedAccounts;

        })
    })
    }

    const renderAccounts = (account) => {
        $(".summaryAccounts").children("ul").append(`
        <li class="account">
          <h3 class="account-name">${account.username}</h3>
          <h3 class="balance">0</h3>
        </li>`)
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
        });
    })
})
}
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

    getAccounts();
    addNewAccount();
    getAccountsById();
    getNameAccount();
    addAccountObj();

    })

    
