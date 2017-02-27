$(function() {

  var userslist;

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
    var input = $("#chat_group_member").val();  // a b
    var inputs = input.split(" ").filter(function(e) { return e; });  // [ a, b ]
    var newInputs = inputs.map(editElement); // ^[ a, b ]
    var word = newInputs.join("|"); // ^a|^b
    var reg = RegExp(word); //対象の文字列の値のはじめの文字はa か b、とする正規表現
    $.ajax({
      type: 'GET',
      url: '/groups/new.json',
    })
    .done(function(users){
      var userNames = users.map(pickNames); //Json産のUser.allからnameだけの配列を作っています。
      $('.member_list').remove();
      if ( input.length !== 0 ) {
        $.each( userNames , function(i , name) {
          if (name.match(reg)) {
            appendList( name );
          }
        });
      }
      userslist = users;
      return userslist;
    });
  });

  $(document).on("click",".member_list", function (){
    console.log( userslist );
    var ids = userslist.map(pickIds); //Json産のUser.allからidだけの配列を作っています。
    var names = userslist.map(pickNames); //Json産のUser.allからnameだけの配列を作っています。
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
