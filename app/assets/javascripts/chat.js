$(window).bind("load", function(){
  if(document.URL.match(/chats/)) {
    // チャット一覧部分を常に一番下にスクロールして表示
    var scrollHeight = $( "#content__right__body" )[0].scrollHeight ;
    $("#content__right__body").scrollTop(scrollHeight);

    var count = 1; //新要素のidに一意性を持たせるための数字です。
    var latestTime;

    function viewNewChat(data){
        var bodyHtml = data.body;
        var imageHtml = data.image.url;
        var userHtml = data.name;
        var timeHtml = data.time;
        $('.content__right__body').append( `
          <div class="chat-data" id="js_chat-data-${count}">
            <ul>
              <li class="user_name" id="js_user_name-${count}"></li>
              <li class="create_time" id="js_create_time-${count}"></li>
            </ul>
            <div class="chat-body" id="js_chat-body-${count}"></div>
          </div>
          `);
        if( imageHtml !== null ){ //画像の投稿があるときだけ画像の挿入をする分岐
          $(`#js_chat-data-${count}`).append(`
            <img class="chat-image" id="js_chat-image-${count}" alt="画像の投稿に失敗しました" src="${imageHtml}">
            `);
          $(`#js_chat-image-${count}`).append(imageHtml);
        }
        $(`#js_chat-body-${count}`).append(bodyHtml);
        $(`#js_user_name-${count}`).append(userHtml);
        $(`#js_create_time-${count}`).append(timeHtml);
        $("#chat_body").val('');
        $('#content__right__body').animate( { scrollTop:(scrollHeight) },1500 );  // 新しいチャットをフェードイン（っぽくみせる）
        $('body').append('<div class="alert alert-success">メッセージを投稿しました</div>');
        count ++ ;
        var newScrollHeight = $( "#content__right__body" )[0].scrollHeight ;
        scrollHeight = newScrollHeight; //要素の追加で変わってしまった高さを再取得しています。
        return count, scrollHeight;
    }

    function latest(){
      var latestChat = $('.content__right__body').last().find('ul').last();
      var latestTime = $(latestChat).find('.create_time').html();
      return latestTime;
    }

    $(function(){
      setInterval(function(){    //１0秒毎に自動更新する
        var group = $('#chat_group_id').val();
        var user = $('#chat_user_id').val();
        $.ajax({
          type: 'GET',
          url: './chats.json',
        })
        .done(function (data) {
          if($('.content__right__body').children().hasClass('chat-data')) {
            var viewTime = latest().replace(/^\s+|\s/g, "");
            var severTime = data.time.replace(/^\s+|\s/g, "");
            if( severTime != viewTime || viewTime == 0 ){
              viewNewChat(data);
            } 
          }else {
            viewNewChat(data);
          }
        });
      },5000);
    });

    $(".new_chat").on('submit', function(e) { //submit時にメッセージ入力部のデータを取得
      e.preventDefault();
      var fd = new FormData($('#new_chat').get(0));
      fd.append('image', $('input[type=file]')[0].files[0]);
      $.ajax({  //chats.jsonにPOST
        type: 'POST',
        url: './chats.json',
        data: fd,
        processData: false,
        contentType: false
      })
      .done(function(data) {  //データが取得できたとき、定形にして出力してから入力部をカラにして、も一回スクロール
        viewNewChat(data);
      })
      .fail(function() {  //なんか失敗した時用のエラー
        $('body').append('<div class="alert alert-danger">メッセージを入力して下さい</div>');
      });
      return false; //SUBMITの硬直を防ぎます。
    });
  };
});
