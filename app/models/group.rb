class Group < ApplicationRecord
  has_many :groups_users
  has_many :user, through: :groups_users
end
