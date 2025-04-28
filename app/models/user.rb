class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :zipcode, presence: true
end
