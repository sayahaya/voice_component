class CreateVoices < ActiveRecord::Migration[6.1]
  def change
    create_table :voices do |t|
      t.string :profileId
      t.string :name

      t.timestamps
    end
  end
end
