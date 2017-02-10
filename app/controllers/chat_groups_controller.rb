class ChatGroupsController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery except: :ChatGroups_post

  def index
  end

  def edit
  end

  def new
  end

  def create
    Group.create(group_params)
    redirect_to action: :index
  end

  private
  def group_params
    params.permit(:name)
  end
end
