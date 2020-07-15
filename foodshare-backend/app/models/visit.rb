class Visit < ApplicationRecord
    has_many :items, :dependent => :destroy 
    validates :food_pantry, presence: true
end
