// Generated by CoffeeScript 1.8.0
(function() {
  var gen_key, key_length, paste_text, upload_url;

  upload_url = '/p';

  key_length = 16;

  $('#pasteButton').click(function(event) {
    var text;
    text = $("#pasteArea").val();
    console.log(text);
    return paste_text(text);
  });

  paste_text = function(text) {
    var csrf_token, enc_text, key;
    text = sjcl.codec.utf8String.toBits(text);
    text = sjcl.codec.base64.fromBits(text);
    key = gen_key(key_length);
    enc_text = sjcl.encrypt(key, text);
    console.log(enc_text);
    csrf_token = $.cookie('csrftoken');
    is_code = $("#codeCheckbox").prop('checked')
    return jQuery.post(upload_url, {
      encr: enc_text,
      is_code: is_code,
      csrfmiddlewaretoken: csrf_token
    }, null, 'text').done(function(data) {
      return window.location.href = "/" + data + "#" + key;
    });
  };

  gen_key = function(len) {
    return new Array(len + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, len);
  };

}).call(this);