class ChatsController < ApplicationController
  before_action :set_group
  require 'slack/incoming/webhooks'

  def index
    @chat = Chat.new
    respond_to do |format|
      format.html { render "index"}
      format.json { render "index"}
    end
  end

  def create
    @chat = Chat.new(chat_params)
    if @chat.save
      respond_to do |format|
        format.html { redirect_to group_chats_path(@chat.group_id), notice:'メッセージを投稿しました' }
        format.json { render "chat" }
      end
    else
      flash.now[:alert] = 'メッセージを入力して下さい'
      render action: :index
    end
  end

  private

  def set_group
    @group = Group.includes(:user).find(params[:group_id])
  end

  def chat_params
    params.require(:chat).permit(:body, :image, :user_id, :group_id)
  end
end
