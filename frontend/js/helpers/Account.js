
    
   $(document).ready(() => {

    $.ajax({
        method: "get",
        url: "http://localhost:3000/accounts",
    }).done((accounts) => {
        //console.log("accounts", accounts);
        $.each(accounts, (index, account) => {
            console.log("account", account);

            $(".summaryAccounts").children("ul").append(`
            <li>
              <h3>${account.username}</h3>
            </li>`);
        })
    });


    $("#accountForm").submit(event => {
        console.log("submit");
        $.ajax({
            method: "post",
            data: {
              newAccount: "teste",
                },
            url: "http://localhost:3000/accounts",
            dataType: "json",
        }).done((data) => {
            console.log("data", data);
        })
    })
        
    })

 
 
 




