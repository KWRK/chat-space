require 'faker'

FactoryGirl.define do
  factory :group do
    name        Faker::Cat.name
    user_ids     "1 , 2"
  end
end
