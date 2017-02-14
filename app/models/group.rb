class Group < ApplicationRecord
  validates :name, :user, presence: true
  has_many :chats
  has_many :groups_users
  accepts_nested_attributes_for :groups_users
  has_many :user, through: :groups_users
end
