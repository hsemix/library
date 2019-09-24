var Library = {};
$(function () {
    $(document).on("submit", "#user-signup", function (e) {
        e.preventDefault();
        let form = $(this);
        let username = form.find("#username");
        let firstname = form.find("#firstname");
        let lastname = form.find("#lastname");
        let email = form.find("#email");
        let password = form.find("#password");
        let error = form.find("#error");

        if (username.val() !== "" && firstname.val() !== "" && lastname.val() !== "" && email.val() != "" && password.val() !== "") {
            error.addClass("hidden");
            $.ajax({
                type: 'post',
                url: '/',
                data: form.serialize()
            }).then(function (data) {
                if (data.app_status) {
                    console.log(data.message);
                } else {
                    error.removeClass("hidden").html(data.message);
                }
            });
        } else {
            error.removeClass("hidden").html("All fields are required");
        }
    });

    Library.Forms = {
        submitForm: function (elem) {
            var form = $(elem);
            var elemParent = form.parents('.form-container');
            var msgContainer = form.find('.alert');
            $.ajax({
                type: 'post',
                url: form.attr('action'),
                data: form.serialize()
            }).then(data => {
                if (data.app_status) {
                    if (data.status_code == 1) { // redirect
                        window.location = data.redirect_url
                    } else if (data.status_code == 2) { // show success message and stay on the current page
                        msgContainer.addClass('alert-success').removeClass('alert-danger').removeClass('hidden').html(data.message);
                        form[0].reset();
                    }
                } else {
                    msgContainer.addClass('alert-danger').removeClass('alert-success').removeClass('hidden').html(data.message);
                }
            });
        }
    }

});