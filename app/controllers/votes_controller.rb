class VotesController < ApplicationController
  def new
    @current_user = User.find(session[:current_user_id])
  end

  def create
    binding.pry
    v = Vote.new(user: params[:current_user], candidate: params[:candidate]) 
  end
end
