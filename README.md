# README

## Awsome Name

* Chat-Space

### Ruby version
* Ruby  => 2.3.1
* Ruby on Rails => '~> 5.0.0' , '>= 5.0.0.1'

### Database initialization

#### table : users  (by gem 'devise')
| type          | column name   |             |
|*--------------|*--------------|*------------|
| t.integer     | :id           | null: false |
| t.string      | :name         | null: false |
| t.string      | :email        | null: false |
| t.string      | :password     | null: false |
| t.timestamp   |               | null: false |


#### table : chats
| type          | column name   |              |
|*--------------|*--------------|*-------------|
| t.integer     | :id           |null: false   |
| t.references  | :user         |index: true ,foreign_key: true|
| t.references  | :group        |index: ture ,foreign_key: ture|
| t.text        | :text         |              |
| t.string      | :image        |              |
| t.timestamp   |               |null: fales   |

#### table : groups

| type          | column name   |              |
|*--------------|*--------------|*-------------|
| t.integer     |:id            |null: false   |
| t.srting      |:name          |              |
| t.timestamp   |               |              |

#### table : groups_users
| type          | column name   |              |
|*--------------|*--------------|*-------------|
| t.integer     | :id           | null: false  |
| t.references  | :user         | foreign_key: ture |
| t.references  | :group        | foreign_key: ture |
| t.timestamp   |               |              |

#### assosiation

```
class User < ActiveRecord::Base

  has_many  :chats
  has_many  :groups_users
  has_many  :groups, throgh: :groups_users
end
```

```
class Chat < ActiveRecord::Base

  belongs_to :group
  belongs_to :user
end
```

```
class Groups < ActiveRecord::Base

  has_many :chats
  has_many :groups_users
  has_many :user, through: :groups_users
end
```
```
class GroupsUsers < ActiveRecord::Base

  groups_users belongs_to: users
  groups_users belongs_to: groups
end
```

