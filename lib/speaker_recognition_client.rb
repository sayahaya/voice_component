class SpeakerRecognitionClient
  class << self
    def connection
      Faraday.new(Settings.speaker_identification.url) do |builder|
        builder.headers['Content-Type'] = 'audio/x-pcm;bit=16;rate=16000;channels=1'
        builder.headers['Ocp-Apim-Subscription-Key'] = Settings.speaker_identification.subscription_key
        builder.response :json
      end
    end

    def response(audio)
      file = File.read(audio)
      response = connection.post do |request|
        request.body = file
      end
      response.body
    end
  end
end
