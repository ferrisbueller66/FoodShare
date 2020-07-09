class VisitSerializer < ActiveModel::Serializer
  attributes :id, :date, :food_pantry, :completed
  has_many :items
end
