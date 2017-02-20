require'rails_helper'

describe ChatsController, type: :controller do

  let(:group) { create(:group) }
  let(:chat) { build(:chat) }
  let(:chat_params) { { body: chat.body, group_id: chat.group_id, user_id: chat.user_id } }

  describe 'GET #index' do

    it "@chatが空で新規作成されるかを確認" do
      get :index, group_id: group
      expect(chat).to be_a_new(Chat)
    end

    it "@groupが期待する値になるか確認" do
      get :index, group_id: group
      expect(assigns(:group)).to eq group
    end

    it "indexのビューに正しくページ移動する事を確認" do
      get :index, group_id: group
      expect(response).to render_template :index
    end
  end

  describe 'POST #create' do
    context "@chatが正しく保存される条件の場合" do
      it "@chatが正しく保存される" do
        expect{ post :create, group_id: group, chat: chat_params }.to change(Chat, :count).by(1)
      end
      it "chat#indexにリダイレクトされる" do
        get :create, group_id: group, chat: chat_params
        expect(response).to redirect_to group_chats_path(chat.group_id)
      end
    end
    context "@chatが保存されない条件の場合" do
      it "@chatが保存されない" do
        expect{ post :create, group_id: group, chat: attributes_for(:chat, body: "") }.to change(Chat, :count).by(0)
      end
      it "chat#indexにレンダリングされる" do
        post :create, group_id: group, chat: attributes_for(:chat, body: "")
        expect(response).to render_template :index
      end
    end
  end
end
