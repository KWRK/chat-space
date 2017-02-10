Rails.application.routes.draw do

  devise_for :users
  root "chat_groups#index"
  post "chat_groups" => "chat_groups#create"
  get "chat_groups" => "chat_groups#index"
  resources "groups" ,only: [:new, :edit]

end
