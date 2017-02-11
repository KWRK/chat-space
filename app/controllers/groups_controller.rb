class GroupsController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery except: :ChatGroups_post

  def index
  end

  def new
    @group = Group.new
  end

  def edit
    @group = Group.find(params[:id])
  end

  def create
    group = Group.new(group_params)
    if group.save
      flash[:notice] = '新しいグループを作成しました'
      redirect_to action: :index
    else
      flash[:alert] = 'グループの作成に失敗しました'
      redirect_to(:back)
    end
  end

  private
  def group_params
    params.require(:group).permit(:name)
  end
end
