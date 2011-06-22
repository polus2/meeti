
require(["/javascripts/spinnets/validation/jquery.validate.min.js"], function() {

    require.ready(function() {

        $("form").validate({
            rules: {
                "user[email]": {
                    required : true,
                    email    : true,
                    remote   : "/validate"
                },
                "user[password]": {
                    required : true,
                    minlength: 5
                },
                "user[password_confirmation]": {
                    required : true,
                    equalTo  : "#user_password"
                },
                "user[phone]": {
                    required : true,
                    number   : true,
                    remote   : "/validate"
                }
            },
            messages: {
                "user[email]": {
                    required : "Пожалуйста, введите ваш email",
                    email    : "Пожалуйста, исправьте ошибку в адресе",
                    remote   : "Такой адрес у нас уже зарегистрирован"
                },
                "user[password]": {
                    minlength : "Длина пароля должна быть не менее 5 символов",
                    required  : "Пожалуйста, введите ваш пароль"
                },
                "user[password_confirmation]": {
                    required: "Полажуйста, введите подтверждение пароля",
                    equalTo: "Подтверждение должно совпадать с паролем",
                    remote: jQuery.format("{0} is already in use")
                },
                "user[phone]" : {
                    required : "Введите ваш номер телефона",
                    number   : "В номере допускаются только цифры",
                    remote   : "Номер телефона не опознан или уже зарегистрирован"
                }
            },
            success: function(label) {
                label.html("Все правильно").parents(".field").removeClass("invalid").addClass("valid");
            },
            errorPlacement: function(error, element) {
                error.insertAfter(element);
                element.parents(".field").removeClass("valid").addClass("invalid")
            },
            invalid: function(error) {
                error.parents(".field").removeClass("valid").addClass("invalid")
            }
        })

    })

})