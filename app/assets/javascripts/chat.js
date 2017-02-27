$(window).bind("load", function(){
  if(document.URL.match(/chats/)) {
    // チャット一覧部分を常に一番下にスクロールして表示
    var scrollHeight = $( "#content__right__body" )[0].scrollHeight ;
    $("#content__right__body").scrollTop(scrollHeight);

    function buildBodyHTML(data) {
      var bodyHtml = data.body;
      return bodyHtml;
    }
    function buildUserHTML(data) {
      var userHtml = data.name;
      return userHtml;
    }
    function buildTimeHTML(data) {
      var timeHtml = data.time;
      return timeHtml;
    }

    $(".new_chat").on('submit', function(e) { //submit時にメッセージ入力部のデータを取得
      e.preventDefault();
      var body = $('.js-input').val();
      var group = $('#chat_group_id').val();
      var user = $('#chat_user_id').val();
      $.ajax({  //取得したデータにparamsの紐付けをして、./chats.jsonにPOST
        type: 'POST',
        url: './chats.json',
        data: {
          chat: {
            body: body,
            group_id: group,
            user_id: user,
          }
        },
      })
      .done(function(data) {  //データが取得できたとき、定形にして出力してから入力部をカラにして、も一回スクロール
        var bodyHtml = buildBodyHTML(data);
        var userHtml = buildUserHTML(data);
        var timeHtml = buildTimeHTML(data);
        $('.content__right__body').append('<div class="js_chat-data"><ul><li id="js_user_name"></li><li id="js_create_time"></li></ul><div class="js_chat-body"></div></div>');
        $('.js_chat-body').append(bodyHtml);
        $('#js_user_name').append(userHtml);
        $('#js_create_time').append(timeHtml);
        $("#chat_body").val('');
        $('#content__right__body').animate( { scrollTop:(scrollHeight) },1500 );  // 新しいチャットをフェードイン（っぽくみせる）
        $('#content__right__body').append('<div id="js_chat-input__guard">続けてメッセージを送信するには<a href= "chats">リロード</a>して下さい。</div>'); //連続投稿できない事をつたえる表示
        $('body').append('<div class="alert alert-success">メッセージを投稿しました</div>');
      })
      .fail(function() {  //なんか失敗した時用のエラー
        $('body').append('<div class="alert alert-danger">メッセージを入力して下さい</div>');
      });
    });
  };
});
