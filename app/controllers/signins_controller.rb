class SigninsController < ApplicationController
  def new
  end

  def create
    current_user = User.find_or_create_by!(email: user_params[:email]) do |user| 
      user.zipcode = user_params[:zipCode]
    end

    session[:current_user_id] = current_user.id
    session[:current_user_email] = current_user.email

    render json: {}, status: :created 
  end

  private

  def user_params
    params.require(:user).permit(:email, :zipCode)
  end
end
