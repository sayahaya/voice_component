class CreateTopMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :top_messages do |t|
      t.string :message

      t.timestamps
    end
  end
end
