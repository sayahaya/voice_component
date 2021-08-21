class StaticPagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def top
    @message = TopMessage.message
  end

  def result
    @audio = params[:audio]
    res = SpeakerRecognitionClient.response(@audio)
    voice_ids = res['profilesRanking'][0..3].map { |id| id['profileId'] }
    voice_names = Voice.data.select { |voice| voice_ids.include?(voice[:profile_id]) }.map { |voice| voice[:name] }
    voice_scores = res['profilesRanking'][0..3].map { |score| score['score'] * 100 }
    render json: { 'names' => voice_names,
                   'scores' => voice_scores }
  end

  def help; end

  def terms; end

  def privacy; end

  def inquiry; end
end
