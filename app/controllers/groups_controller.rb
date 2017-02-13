class GroupsController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery except: :Groups_post

  def index
    @groups = current_user.groups.all
  end

  def show
    @group = Group.find(params[:id])
    @groups = current_user.groups.all
    @users = Group.find(params[:id]).user.all
  end
 
  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to group_path(@group), notice:'新しいグループを作成しました'
    else
      flash[:alert] = 'グループの作成に失敗しました'
      render action: :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    group = Group.find(params[:id])
    if group.update(group_params)
      redirect_to group_path, notice:'グループ情報を更新しました'
    else
      flash[:alert] = 'グループ情報の更新に失敗しました'
      redirect_to edit_group_path
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, {user_ids: []})
  end
end
