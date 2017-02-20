require 'faker'

FactoryGirl.define do
  factory :chat do
    body      Faker::Food.spice
    user_id   Faker::Number.between(1,3)
    group_id  Faker::Number.between(1,3)
  end
end
