Rails.application.routes.draw do

  root "chat_groups#index"
  get "chat_groups" => "chat_groups#index"

end
