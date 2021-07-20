class StaticPagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def top
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
    result = JSON.parse(response.read_body)
    voiceId_1 = result['profilesRanking'][0]['profileId']
    voiceId_2 = result['profilesRanking'][1]['profileId']
    voiceId_3 = result['profilesRanking'][2]['profileId']
    voiceId_4 = result['profilesRanking'][3]['profileId']
    name_1 = Voice.find_by(profileId: voiceId_1)['name']
    name_2 = Voice.find_by(profileId: voiceId_2)['name']
    name_3 = Voice.find_by(profileId: voiceId_3)['name']
    name_4 = Voice.find_by(profileId: voiceId_4)['name']
    score_1 = (result['profilesRanking'][0]['score'])*100
    score_2 = (result['profilesRanking'][1]['score'])*100
    score_3 = (result['profilesRanking'][2]['score'])*100
    score_4 = (result['profilesRanking'][3]['score'])*100
    render json: { "name_1" => name_1,
                   "name_2" => name_2,
                   "name_3" => name_3,
                   "name_4" => name_4,
                   "score_1" => score_1,
                   "score_2" => score_2,
                   "score_3" => score_3,
                   "score_4" => score_4
                 }
  end

  def help; end

  def terms; end

  def privacy; end

  def inquiry; end
end
