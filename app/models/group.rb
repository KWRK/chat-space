class Group < ApplicationRecord
  validates :name, presence: true

  has_many :groups_users
  has_many :user, through: :groups_users
end
