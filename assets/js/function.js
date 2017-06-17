/*******************************************************
 * Copyright (C) 2010-2011 {Jordan Hinks} <{JordanHinks0@gmail.com}>
 *
 * This file is part of {Jordan Hinks Personal Website}.
 *
 * {Jordan Hinks Personal Website} can not be copied and/or distributed without the express
 * permission of {Jordan Hinks}
 *******************************************************/

//@prepros-prepend jquery.min.js
/*global $ */
jQuery(document).ready(function($) {
  "use strict";

  // Mobile Toggle
  $('#nav-toggle').click(function (mm) {
    mm.stopPropagation();
    $('#nav-items').toggleClass('active');
    $('#nav-toggle').toggleClass('active');
  });

  // Close Nav Menu Unfocus
  $(document).click(function (event) {
    var clickover = $(event.target);
    var active = $("#nav-items").hasClass("active");

    if (active === true && !clickover.hasClass("active") && !clickover.hasClass("dd")) {
      $('#nav-items').removeClass('active');
      $('#nav-toggle').removeClass('active');
    }
  });

  // Auto Close Mobile Nav Menu
  var $window = $(window);
  function checkWidth(){
    var windowsize = $window.width();
    if (windowsize > 710){
      $('#nav-items').removeClass('active');
      $('#nav-toggle').removeClass('active');
    }
  }
  checkWidth();
  $(window).resize(checkWidth);

  // Smooth Scroll
  $('a[href^="#"]').click(function(){
    var scrl = $(this).attr("href");
    $('html,body').animate({
      scrollTop:$(scrl).offset().top
    }, '400');
    return false;
  });

  // To Top
  $(window).scroll(function(){
    if($(this).scrollTop() > 499){
      $('#to-top').fadeIn();
    }else{
      $('#to-top').fadeOut();
    }
  });

  // Client Belt
  $(function(){
    $('.info').click(function(){
      $('.clients-area').css('left', '-100%');
      $('.client').show(400);
    });

    $('.back').click(function(){
      $('.clients-area').css('left', '0%');
      $('.client').hide(800);
    });
  });

  // Client Belt - Comply with AJAX content
  $(document).ajaxComplete(function(){
    $(function(){
      $('.info').click(function(){
        $('.clients-area').css('left', '-100%');
        $('.client').show(400);
      });

      $('.back').click(function(){
        $('.clients-area').css('left', '0%');
        $('.client').hide(800);
      });
    });
  });

  // Client Info Load
  $(function() {
    $.ajaxSetup({ cache: false });

    $('.info').click(function() {
      var $this = $(this),
      newTitle = $(this).find('h3').text(),
      newfolder = $(this).data('folder'),
      spinner = '<div class="loader">Loading...</div>',
      newHTML = 'clients/' + newfolder + '.html';

      $('.client-content').html(spinner).load(newHTML);
      $('strong').text(newTitle);
    });
  });

  // Active dropdown arrow
  /*$('.filter-box').click(function(){
    $('#client-filter-arrow').toggleClass('active');
  });*/

  // Contact Modal
  $('.contact-trigger, .close-modal').click(function(e){
    e.preventDefault();
    $('.modal-area').toggleClass('active');
    $('body, html').toggleClass('noscroll');
  });

  // Contact form jumping labels
  $('.input-group input, .input-group textarea').focusout(function() {
    var text_val = $(this).val();

    if(text_val == "") {
      $(this).removeClass('has-value');
    }else {
      $(this).addClass('has-value');
    }
  });

  // Form Name Validation
  $('input#name').keyup(function () {
    this.value = this.value.replace(/[^a-zA-Z \.]/g,'');
  });

  $('input#phone').keyup(function () {
    this.value = this.value.replace(/[^0-910 \.]/g,'');
  });

  // Form sent notification
  var $contactForm = $('#contact-form');

  $contactForm.submit(function(e) {
    e.preventDefault();
    var $submit = $('input:submit', $contactForm);
    var defaultSubmitText = $submit.val();

    $.ajax({
      url: 'https://formspree.io/jordanhinks0@gmail.com',
      url: '//formspree.io/jordanhinks0@gmail.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      beforeSend: function() {
        $('input').attr('disabled', true);
        $('textarea').attr('disabled', true);
        $submit.attr('disabled', true).val(defaultSubmitText);
        $('.modal').addClass('disabled');
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
          $('.modal').removeClass('disabled');
          $('.modal-area').removeClass('active');
          $('body, html').removeClass('noscroll');
          $submit.attr('disabled', false).val(defaultSubmitText);
          $('.alert-success').remove();
          $('#contact-form')[0].reset();
          $('.input-group input, .input-group textarea').removeClass('has-value');
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
          $('.modal').removeClass('disabled');
          $submit.attr('disabled', false).val(defaultSubmitText);
          $('.alert-error').remove();
        }, 3500);
      }
    });
  });


});
