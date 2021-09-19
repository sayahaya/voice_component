require 'rails_helper'

RSpec.describe "TopPages", type: :system do
  context '使用方法のページにアクセス' do
    it '正しく表示される' do
      visit root_path
      click_on 'Voice componentとは'
      expect(page).to have_content 'Voice componentとは'
      expect(page).to have_link 'トップページへ'
    end
  end

  context '利用規約ページにアクセス' do
    it '正しく表示される' do
      visit root_path
      click_on '利用規約'
      expect(page).to have_content '利用規約'
      expect(page).to have_link 'トップページへ'
    end
  end

  context 'プライバシーポリシーページにアクセス' do
    it '正しく表示される' do
      visit root_path
      click_on 'プライバシーポリシー'
      expect(page).to have_content 'プライバシーポリシー'
      expect(page).to have_link 'トップページへ'
    end
  end

  context 'お問い合わせ先ページへアクセス' do
    it '正しく表示される' do
      visit root_path
      click_on 'お問い合わせ先'
      expect(page).to have_content '@yama2_0506'
      expect(page).to have_link 'トップページへ'
    end
  end
end
