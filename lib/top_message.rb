class TopMessage
  def self.message
    messages = {
      message1: '「あなたの名前と魅力を一言で！！」',
      message2: '「今ハマってることの魅力を一言で！！」',
      message3: '「好きな曲のワンフレーズ歌って！！」',
      message4: '「大切な人（家族）に向けて一言！！」',
      message5: '「普段は出さない高声・低音に挑戦！！」'
    }
    messages.values.sample
  end
end
