Rails.application.routes.draw do

  devise_for :users
  root "groups#index"
  resources "groups", except: %i(destroy show) do
    resources "chats", only: %i(index create)
  end
end
