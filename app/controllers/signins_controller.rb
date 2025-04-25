class SigninsController < ApplicationController
  def new
  end

  def create
    user_params = params[:user]

    current_user = User.find_or_create_by!(email: user_params[:email]) do |user| 
      user.zipcode = user_params[:zipCode]
    end

    session[:current_user_id] = current_user.id
    session[:current_user_email] = current_user.email

    render json: {}, status: :created 
  end
end
