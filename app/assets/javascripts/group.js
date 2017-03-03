$(function() {

  var preWord; //文字以外でインクリメントサーチの通信をしないための準備
  var usersList;  //メンバーに加える候補者のリスト
  var list = $('#user-search-result');

  function appendList(word) {
    var item = $('<li class="member_list">').append(word);
    list.append( item );
  }

  function editElement(element) {
    var result = "^" + element ;
    return result;
  }

  function pickNames(element) {
    var names = element.name ;
    return names ;
  }

  function pickIds(element) {
    var ids = element.id ;
    return ids ;
  }


  $("#chat_group_member").on("keyup", function(){
    var input = $("#chat_group_member").val();
    var word = input.replace(/^\s+|\s/g, "");
    if ( word.length !== 0 && word != preWord ) {
      $.ajax({
        type: 'GET',
        url: '/groups/new.json',
        data: {
          key: word,
        }
      })
      .done(function(users){
        var userNames = users.map(pickNames); //Json産のresults.allからnameだけの配列を作っています。
        $('.member_list').remove();
          $.each( userNames , function(i , name) {
            appendList(name);
          });
        preWord = word;
        usersList = users;
        return usersList,preWord;
      });
    }
  });

  $(document).on("click",".member_list", function (){
    var ids = usersList.map(pickIds); //Json産のUser.allからidだけの配列を作っています。
    var names = usersList.map(pickNames); //Json産のUser.allからnameだけの配列を作っています。
    var selectName = $(this).html();
    var pos = names.indexOf( selectName ); //選択されたnameのインデックスを返しています。
    var selectId = ids[ pos ]; //nameのインデックスに対応するidを返しています。
    var memberTag = $( `
      <div class="joined-list__user">
        <input value="${selectId}" type='hidden' name='group[user_ids][]' id='group_user_ids'>
        ${selectName}<i class="fa fa-times"></i>
      </div>
    ` );
    $('.joined-list').append( memberTag );
    $("#chat_group_member").val("")
  });

  $(document).on("click",".joined-list__user", function(){
    div = $(this).remove();
  });
});

/*
◎ 入力された文字でユーザー一覧からインクリメントサーチ
◎ 文字列をクリックしたら、メンバー一覧にそのユーザーをついかできる。

*/
