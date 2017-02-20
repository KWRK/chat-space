require'rails_helper'
describe Chat do
  describe '#create' do
    it " バリデーションに引っかからずに保存できることを確かめる" do
      chat = build(:chat)
      expect(chat).to be_valid
    end

    it " body がカラのときバリデーションに引っかかる事を確認する" do
      chat = build(:chat, body: nil)
      chat.valid?
      expect(chat.errors[:body]).to include("を入力してください")
    end

    it " user_id がカラのときバリデーションに引っかかる事を確認する" do
      chat = build(:chat, user_id: nil)
      chat.valid?
      expect(chat.errors[:user_id]).to include("を入力してください")
    end

    it " group_id がカラのときバリデーションに引っかかる事を確認する" do
      chat = build(:chat, group_id: nil)
      chat.valid?
      expect(chat.errors[:group_id]).to include("を入力してください")
    end
  end
end
