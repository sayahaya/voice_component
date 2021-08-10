class StaticPagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def top
    message = TopMessage.order('RAND()').limit(1).pluck(:message)
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
    voice_id1 = result['profilesRanking'][0]['profileId']
    voice_id2 = result['profilesRanking'][1]['profileId']
    voice_id3 = result['profilesRanking'][2]['profileId']
    voice_id4 = result['profilesRanking'][3]['profileId']
    name1 = Voice.find_by(profileId: voice_id1)['name']
    name2 = Voice.find_by(profileId: voice_id2)['name']
    name3 = Voice.find_by(profileId: voice_id3)['name']
    name4 = Voice.find_by(profileId: voice_id4)['name']
    score1 = (result['profilesRanking'][0]['score']) * 100
    score2 = (result['profilesRanking'][1]['score']) * 100
    score3 = (result['profilesRanking'][2]['score']) * 100
    score4 = (result['profilesRanking'][3]['score']) * 100
    render json: { 'name1' => name1,
                   'name2' => name2,
                   'name3' => name3,
                   'name4' => name4,
                   'score1' => score1,
                   'score2' => score2,
                   'score3' => score3,
                   'score4' => score4 }
  end

  def help; end

  def terms; end

  def privacy; end

  def inquiry; end
end
