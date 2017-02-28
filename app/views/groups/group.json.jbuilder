results = User.where("name like ?", "%#{params[:key]}%")
json.array! results.all , :id, :name
