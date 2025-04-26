class VotesController < ApplicationController
  def new
    render :new, locals: { current_user: current_user }
  end

  def create
    candidate = if candidate_params[:id].present?
      Candidate.find(candidate_params[:id])
    else
      Candidate.find_or_create_by!(name: candidate_params[:name])
    end

    vote = Vote.new(user: current_user, candidate: candidate)

    if vote.save
      render json: {}, status: :created 
    else
      render json: {data: "Girl, don't lie you already voted"}, status: :unprocessable_entity 
    end
  end

  private

  def candidate_params
    params.require(:candidate).permit(:id, :name)
  end

  def current_user
    @current_user = User.find(session[:current_user_id])
  end
end
