class Candidate < ApplicationRecord
    validates :name, presence: true, uniqueness: true

    has_many :votes
end
