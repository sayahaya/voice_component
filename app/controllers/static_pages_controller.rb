class StaticPagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def top
    gon.voices = Voice.all
    message = TopMessage.order("RAND()").limit(1).pluck(:message)
    @message = message.first
  end

  def result
    @audio = params[:audio]
    require 'uri'
    require 'net/http'
    require 'openssl'
    url = URI(Settings.speaker_identification.url)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(url)
    request['Content-Type'] = 'audio/x-pcm;bit=16;rate=16000;channels=1'
    request['Ocp-Apim-Subscription-Key'] = Settings.speaker_identification.subscription_key
    file = File.read(@audio)
    request.body = file
    response = http.request(request)
    @result = response.read_body
    render json: @result
  end

  def help; end

  def terms; end

  def privacy; end

  def inquiry; end
end
