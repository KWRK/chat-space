require 'faker'

FactoryGirl.define do
  factory :chat do
    body      Faker::Food.spice
    user_id   "1"
    group_id  "1"
  end
end
