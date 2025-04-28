class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|

      t.timestamps
      t.string "email", null: false, unique: true
      t.string "zipcode", null: false, unique: true
    end
  end
end
