class StaticPagesController < ApplicationController
  def top
    gon.url = Settings.speaker_identification.url
    gon.subscription_key = Settings.speaker_identification.subscription_key
  end

  def help; end

  def terms; end

  def privacy; end

  def inquiry; end
end
