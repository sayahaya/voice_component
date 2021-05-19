class StaticPagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def top
    gon.url = Settings.speaker_identification.url
    gon.subscription_key = Settings.speaker_identification.subscription_key
    gon.voices = StaticPage.all
  end

  def help; end

  def terms; end

  def privacy; end

  def inquiry; end

end
