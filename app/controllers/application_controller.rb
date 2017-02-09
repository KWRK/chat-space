class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_strong_parameters, if: :devise_controller?

  private
  def configure_strong_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end
