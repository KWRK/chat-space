class ChatsController < ApplicationController

  def index
    @group = Group.find(params[:id])
    @chats = @group.chats
  end

  def create
    @chat = Chat.create(chat_params)
    redirect_to group_path(@chat.group_id)
  end

  private

  def chat_params
    params.permit(:body, :user_id, :group_id)
  end
end
