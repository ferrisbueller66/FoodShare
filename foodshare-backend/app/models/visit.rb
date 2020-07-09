class Visit < ApplicationRecord
    has_many :items
    validates :food_pantry, presence: true
end
