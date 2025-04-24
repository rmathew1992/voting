class SigninsController < ApplicationController
  def new
  end

  def create
    render json: {}, status: :created 
  end
end
