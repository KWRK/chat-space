# README

## Awsome Name

* Chat-Space

### Ruby version
* Ruby  => 2.3.1
* Ruby on Rails => '~> 5.0.0' , '>= 5.0.0.1'

### Database initialization

#### Users Table  (by gem 'devise')
* columns and data type

| columns       |  data type    |  contraint  |
|:--------------|:--------------|:------------|
| name          | string        | null: false |

* association

  has_many  :chats <br />
  has_many  :groups_users  <br />
  has_many  :groups, through: :groups_users


#### Chats Table
* columns and data type

| columns       |  data type    |  contraint                   |
|:--------------|:--------------|:-----------------------------|
| body          | text          |                              |
| image         | string        |                              |
| user          | references    |index: true ,foreign_key: true|
| group         | references    |index: true ,foreign_key: true|

* association

  belongs_to :user <br />
  belongs_to :group

#### Groups Table
* columns and data type

| columns       |  data type    |  contraint  |
|:--------------|:--------------|:------------|
| name          | string        | null: fales |

* association

  has_many :chats <br />
  has_many :groups_users  <br />
  has_many :user, through: :groups_users


#### GroupsUsers Table
* columns and data type

| columns       |  data type    |  contraint        |
|:--------------|:--------------|:------------------|
| user          | references    | foreign_key: true |
| group         | references    | foreign_key: true |

* association

  belongs_to: user <br />
  belongs_to: group
