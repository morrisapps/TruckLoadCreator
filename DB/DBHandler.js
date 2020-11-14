$(document).ready(function(){
    $('#DBretrieve').click(function(){
        console.log('retrieve')
        let data =  {'connect': true};
        $.post('./DB/connect.php', data, function (response) {
            // Response div goes here.
            let returnedData = JSON.parse(response);
            alert("action performed successfully" + returnedData[1]);
        });
    });
});