class ChatsController < ApplicationController

  def index
    @groups = current_user.groups
    @group = Group.find(params[:group_id])
    @users = @group.user
    @chats = @group.chats
    @chat = Chat.new
  end

  def create
    @chat = Chat.new(chat_params)
    if @chat.save
      redirect_to group_chats_path(@chat.group_id)
    else
      flash.now[:alert] = 'メッセージの送信に失敗しました'
      render action: :index
    end
  end

  private

  def chat_params
    params.require(:chat).permit(:body, :user_id, :group_id)
  end
end
