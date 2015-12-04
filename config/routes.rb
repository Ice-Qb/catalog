Rails.application.routes.draw do
  root to: 'application#angular'

  resources :products, only: [:create, :index, :show]
end
