class ChatsController < ApplicationController

  def index
    @groups = current_user.groups
    @group = Group.find(params[:group_id])
    @users = @group.user
    @chats = @group.chats
    @chat = Chat.new
  end

  def create
    @chat = Chat.create(chat_params)
    redirect_to group_chats_path(@chat.group_id)
  end

  private

  def chat_params
    params.require(:chat).permit(:body, :user_id, :group_id)
  end
end
