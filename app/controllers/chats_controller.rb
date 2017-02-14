class ChatsController < ApplicationController

  def create
    @chat = Chat.create(chat_params)
    redirect_to group_path(@chat.group_id)

  end

  def show
  end

  private

  def chat_params
    params.permit(:body, :user_id, :group_id)
  end
end
