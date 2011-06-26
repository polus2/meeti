#encoding:utf-8

class Authentication < ActiveRecord::Base

  belongs_to :user

  def self.provider_name(provider)
    if provider = "vkontakte"
      "ВКонтакте"
    else
      provider.titleize
    end
  end

  def provider_name
    self.class.provider_name(provider)
  end

end
