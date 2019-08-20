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
});