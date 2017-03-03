json.set! :name, @chat.user.name
json.set! :body, @chat.body
json.set! :time, @chat.created_at.strftime('%Y/%m/%d  %H:%M:%S')
json.set! :image, @chat.image if @chat.image
