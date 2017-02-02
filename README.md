# README

## Awsome Name

* Chat-Space

### Ruby version
* Ruby  => 2.3.1
* Ruby on Rails => '~> 5.0.0' , '>= 5.0.0.1'

### Database initialization

#### table : users  (by gem 'devise')

* t.integer :id
>null: false
* t.string :name
>null: false
* t.string :email
>null: false
* t.string :password
>null: false
* t.timestamp
>null:false

#### table : chats

* t.integer :id
>null: false
* t.references :user
>index: true ,
>foreign_key: true
* t.references :group
>index: ture ,
>foreign_key: ture
* t.text :text
* t.string :image_url
* t.timestamp
>null: fales

#### table : groups

* t.integer :id
>null: false
* t.srting :group_name
* t.timestamp

#### table : user_groups

* t.integer :id
* t.references :user_id
>foreign_key: ture
* t.references :group_id
>foreign_key: ture
* t.timestamp

#### assosiation

* users has_many :chats
* users has_many :user_groups
* users has_many :groups, throgh: :user_groups

* chats belongs_to :group
* chats belongs_to :user

* groups has_many :chats
* groups has_many :user_groups
* groups has_many :user, through: :user_groups

* user_groups belongs_to: user
* user_groups belongs_to: group
