class Item < ApplicationRecord
    belongs_to :visit
    validates :name, presence: true
end
