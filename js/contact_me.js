$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // ek hata mesajları veya olaylar
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // varsayılan gönderme davranışını engelle
            // FORM'dan değerler al
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // Başarı/Başarısızlık Mesajı İçin
            // Başarılı/Başarısız mesajı için adında boşluk olup olmadığını kontrol edin
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Başarı mesajı
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Mesajınız gönderildi! </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //tüm alanları temizle
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Başarısız mesajı
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Üzgünüm " + firstName + ", E-Mail sunucumuz şu anda kapalıdır. Lütfen daha sonra tekrar deneyiniz!");
                    $('#success > .alert-danger').append('</div>');
                    //tüm alanları temizle
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/* Başarısız/başarılı kutuları tam gizle'ye tıkladığınızda */
$('#name').focus(function() {
    $('#success').html('');
});
