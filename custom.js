$(document).ready(function () {
    $('.chat-bot').click(function(event) {
        $('.chat-box').toggleClass('active');
    });
    $('.conv-form-wrapper').convform({selectInputStyle: 'disable'});

});
$(document).ready(function () {
    $('.chat-bot').click(function () {
        $('.img-fluid').hide();
    })

});
$(document).ready(function () {
    $('.close').click(function () {
        $('.chat-box').hide()
        $('.img-fluid').show();
    })

});