Rails.application.routes.draw do

  devise_for :users
  root "groups#index"
  resources "groups", except: :destroy do
    resources "chats", only: :create
  end
end
