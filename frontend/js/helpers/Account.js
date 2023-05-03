 function getAccounts() { 
    
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
        event.preventDefault();
        console.log("submit");
        const accountTest = $(event.target).children('input').val();
        console.log('account', accountTest);
        $(event.target).siblings("")
    })
 });
 }

 getAccounts();



