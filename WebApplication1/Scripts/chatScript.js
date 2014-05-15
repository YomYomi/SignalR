$(function () {
    // Declare a proxy to reference the hub.
    var chat = $.connection.chatHub;

    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message) {
        // Html encode display name and message.
        var encodedName = $('<p />').text(name).html();
        var encodedMsg = $('<p />').text(message).html();
        // Add the message to the page.
        $('#divChat').append('<strong>' + encodedName
            + '</strong>:&nbsp;&nbsp;' + encodedMsg + '<br />');
        
    };


    // Create a function that the hub can call to broadcast messages.
    chat.client.addClientToChat = function (name) {

        // Html encode display name and message.
        var encodedName = $('<p />').text(name).html();

        // Add the new user to the list of users
        $('#listOnlineUsers').append("<li onclick='selectPrivateChatUser('" + encodedName + "')'s>" + encodedName +"&nbsp;&nbsp;</li>");
        
        
    };

    function selectPrivateChatUser(name)
    {
        $("#hdnPrivateChatUser").val(name);
        $("li:contains('" + name +"')").css('background-color', 'red');
    }

    function clearSelectedChatUser()
    {
        $("li").css('background-color', '');
    }


    function privateMessage(name, message)
    {
        chat.server.sendPrivateMessage(name, message);

    }


    $('#txtUser').keypress(function (e) {
        if (e.which == 13) {
            $('#btnLogin').click();
            return false;

        }
    });

    $('#txtMessage').keypress(function (e) {
        if (e.which == 13) {
            $('#btnSend').click();
            return false;
        }
    });


    //// Get the user name and store it to prepend to messages.
    //$('#displayname').val(prompt('Enter your name:', ''));

    $('#btnLogin').click(function (event) {
        $('#displayname').val($("#txtUser").val());
        // Call the Send method on the hub.
        chat.server.clientLogin($('#displayname').val());
        $("#btnLogin").attr('disabled', 'disabled');
        event.preventDefault();
    });



    $('#ClientLogout').click(function () {
        // Call the Send method on the hub.
        chat.server.clientLogout($('#displayname').val());
        $('#btnLogin').removeAttr('disabled');
    });



    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#btnSend').click(function () {
            // Call the Send method on the hub.
            chat.server.send($('#displayname').val(), $('#txtMessage').val());
            // Clear text box and reset focus for next comment.
            $('#txtMessage').val('').focus();
        });
    });
});