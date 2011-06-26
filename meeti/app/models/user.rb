class User < ActiveRecord::Base

  devise :database_authenticatable,
         :recoverable,
         :registerable,
         :rememberable,
         :trackable,
         :validatable

  has_many :authentications, :dependent => :destroy

  def apply_omniauth(omniauth)
    authentications.build(:provider => omniauth[:provider], :uid => omniauth[:uid])
  end

  def password_required?
    (authentications.empty? || !password.blank?) && super
  end

end
