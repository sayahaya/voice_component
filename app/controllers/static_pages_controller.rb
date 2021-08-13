class StaticPagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def top
    message = TopMessage.order('RAND()').limit(1).pluck(:message)
    @message = message.first
  end

  def result
    @audio = params[:audio]
    @file = File.read(@audio)
    conn = SpeakerRecognitionClient.result_connection
    response = conn.post do |request|
      request.body = @file
    end
    result = response.body
    voice_ids = result['profilesRanking'][0..3].map { |id| id['profileId'] }
    names = Voice.where(profileId: voice_ids).select('name')
    scores = result['profilesRanking'][0..3].map { |score| score['score'] * 100 }
    render json: { 'names' => names,
                   'scores' => scores }
  end

  def help; end

  def terms; end

  def privacy; end

  def inquiry; end
end
