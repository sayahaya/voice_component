require 'rails_helper'

RSpec.describe "Tops", type: :request do
  describe "GET /top" do
    it "returns http success" do
      get "/top/top"
      expect(response).to have_http_status(:success)
    end
  end

end
