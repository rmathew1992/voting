class Vote < ApplicationRecord
    belongs_to :user
    belongs_to :candidate
    counter_culture :candidate

    validates :user_id, uniqueness: true
end
