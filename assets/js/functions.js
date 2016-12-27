$(document).ready(function() {
    
  // Mobile navigation toggle
  $('.mobile-nav').click(function(m) {
    m.stopPropagation();
    $('#nav').toggleClass('open');
  });

  // Hide To Top
  $(function () {
    var $win = $(window);

    $win.scroll(function () {
      if ($win.scrollTop() < 399)
      $('#to-top').addClass('hidden')
      else if ($win.height() + $win.scrollTop()
      >= 400) {
        $('#to-top').removeClass('hidden')
      }
    });
  });

  // Scroll animate
  $(function() {
    $('a[href^="#"]').on('click', function(event) {
      var target = $($(this).attr('href'));

      if (target.length) {
        event.preventDefault();

        $('#nav').removeClass('open');

        $('html, body').animate( {
        scrollTop: target.offset().top 
        }, 400);
      }
    });
  });

  // Contact form jumping labels
  $('form .input-group input').focusout(function() {
    var text_val = $(this).val();

    if(text_val == "") {
      $(this).removeClass('has-value');
    }else {
      $(this).addClass('has-value');
    }
  });

  // Client Belt
  $(function() {
    $('.docs').click(function() {
      $('.clients-belt').css('left', '-100%');
      $('.client-wrap').show(400);
    });

    $('.back').click(function() {
      $('.clients-belt').css('left', '0%');
      $('.client-wrap').hide(800);
    });
  });

  // Client Info Load
  $(function() {
    $.ajaxSetup({ cache: true });

    $('.docs').click(function() {
      var $this = $(this),
      newTitle = $this.parent().find('h3').text(),
      newfolder = $this.data('folder');
      spinner = '<div class="loader">Loading...</div>',
      newHTML = 'clients/' + newfolder + '.html';

      $('.client-content').html(spinner).load(newHTML);
      $('strong').text(newTitle);
    });
  });
  
    // Form Value Validation
  $('input#name').keyup(function () { 
    this.value = this.value.replace(/[^a-zA-Z \.]/g,'');
  });
  
  // Form sent notification
  var $contactForm = $('#contact-form');

  $contactForm.submit(function(e) {
    e.preventDefault();
    var $submit = $('input:submit', $contactForm);
    var defaultSubmitText = $submit.val();

    $.ajax({
      url: 'https://formspree.io/{{ site.data.website.email }}',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      beforeSend: function() {
        $('input').attr('disabled', true);
        $('textarea').attr('disabled', true);
        $submit.attr('disabled', true).val(defaultSubmitText);
        $contactForm.append('<div class="alert alert-loading">Sending message…</div>');
      },
      success: function(data) {
        $contactForm.find('.alert-loading').hide();
        $contactForm.append('<div class="alert alert-success">Message sent!</div>');
        $('input').attr('disabled', true);
        $('textarea').attr('disabled', true);
        $submit.attr('disabled', true).val(defaultSubmitText);
        setTimeout(function() {
          $('input').attr('disabled', false);
          $('textarea').attr('disabled', false);
          $submit.attr('disabled', false).val(defaultSubmitText);
          $('.alert-success').remove();
        }, 3500);
      },
      error: function(err) {
        $contactForm.find('.alert-loading').hide();
        $contactForm.append('<div class="alert alert-error">Try again later.</div>');
        $('input').attr('disabled', true);
        $('textarea').attr('disabled', true);
        $submit.attr('disabled', true).val(defaultSubmitText);
        setTimeout(function() {
          $('input').attr('disabled', false);
          $('textarea').attr('disabled', false);
          $submit.attr('disabled', false).val(defaultSubmitText);
          $('.alert-error').remove();
        }, 3500);
      }
    });
  });
  
});