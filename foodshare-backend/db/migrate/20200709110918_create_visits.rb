class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.date :date
      t.boolean :completed
      t.string :food_pantry
      
      t.timestamps
    end
  end
end
