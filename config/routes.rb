Rails.application.routes.draw do
  root to: 'static_pages#top'
  get 'help', to: 'static_pages#help'
  get 'terms', to: 'static_pages#terms'
  get 'privacy', to: 'static_pages#privacy'
  get 'inquiry', to: 'static_pages#inquiry'
end
