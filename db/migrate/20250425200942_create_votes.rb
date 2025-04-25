class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|

      t.timestamps
      t.references :candidate
      t.references :user, unique: true
    end
  end
end
