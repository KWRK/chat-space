CarrierWave.configure do |config|

  config.fog_credentials = {
      provider:               'AWS',
      aws_access_key_id:      ENV['AWS_ACCESS_KEY'],
      aws_secret_access_key:  ENV['AWS_SECRET_ACCESS_KEY'],
      region:                 ENV['AWS_REGION'],
  }
  config.fog_public     = true
  config.fog_attributes = {'Cache-Control' => 'public, max-age=86400'}
  config.fog_directory = ENV['AWS_BUCKET']
  config.cache_dir = "#{Rails.root}/tmp/uploads"
end
