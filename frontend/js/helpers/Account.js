

   $(document).ready(() => {

    //Getting the Accounts from the server and showing them on the Accounts Summary
    $.ajax({
        method: "get",
        url: "http://localhost:3000/accounts",
    }).done((accounts) => {
        //console.log("accounts", accounts);
        $.each(accounts, (index, account) => {
            //console.log("account", account);

            $(".summaryAccounts").children("ul").append(`
            <li>
              <h3 class="account">${account.username}</h3>
              <h3 class="balance"></h3>
            </li>`);
        })
    });



    //Posting the new Accounts on the server
    $("#accountForm").submit(event => {
        
        //console.log("submit");
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


    })

 
 
 




