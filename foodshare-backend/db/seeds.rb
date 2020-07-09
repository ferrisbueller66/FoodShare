# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Visit.create(date: "2020-07-01", food_pantry: "His Church Anglican")
Visit.create(date: "2020-07-02", food_pantry: "12th Street Food Pantry", completed: true)
Visit.create(date: "2020-07-03", food_pantry: "His Church Anglican")
Visit.create(date: "2020-07-04", food_pantry: "12th Street Food Pantry"), completed: true
Visit.create(date: "2020-07-05", food_pantry: "His Church Anglican")
Visit.create(date: "2020-07-06", food_pantry: "12th Street Food Pantry")

Item.create(name: "Bar Soap", quantity: 2, visit_id: 1)
Item.create(name: "Cereal", quantity: 1, visit_id: 1)
Item.create(name: "Tomato Soup", quantity: 4, visit_id: 1)
Item.create(name: "Diapers", quantity: 1, visit_id: 2)
Item.create(name: "Canned Black Beans", quantity: 2, visit_id: 2)
Item.create(name: "Cookies", quantity: 4, visit_id: 2)
Item.create(name: "Dish Soap", quantity: 4, visit_id: 3)
Item.create(name: "Nutrigrain Bars", quantity: 2, visit_id: 3)
Item.create(name: "Canned Peaches", quantity: 1, visit_id: 3)
Item.create(name: "Canned Green Beans", quantity: 4, visit_id: 4)
Item.create(name: "Candy", quantity: 2, visit_id: 4)
Item.create(name: "Chicken Noodle Soup", quantity: 4, visit_id: 4)
Item.create(name: "Hand Soap", quantity: 2, visit_id: 5)
Item.create(name: "Cereal", quantity: 1, visit_id: 5)
Item.create(name: "Canned Black Beans", quantity: 4, visit_id: 5)
Item.create(name: "Canned Tuna", quantity: 2, visit_id: 6)
Item.create(name: "Bar Soap", quantity: 4, visit_id: 6)
Item.create(name: "Cookies", quantity: 1, visit_id: 6)