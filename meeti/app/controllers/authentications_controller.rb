class AuthenticationsController < ApplicationController

  def index
    @authentications = current_user.authentications if current_user
  end

  def create
    omniauth = request.env["omniauth.auth"]
    auth = Authentication.find_by_provider_and_uid(omniauth[:provider], omniauth[:uid])
    if auth
      sign_in_and_redirect(:user, auth.user)
    elsif current_user
      current_user.authentications.create(:provider => omniauth[:provider], :uid => omniauth[:uid])
      redirect_to root_path
    else
      #we dont have any user here
      user = User.new
      user.apply_omniauth(omniauth)
      if user.save
          redirect_to root_path
      else
          session[:omniauth] = omniauth
          redirect_to new_user_registration_path
      end

    end
  end

  def destroy
    @authentication = current_user.authentications.find(params[:id])
    @authentication.destroy
    flash[:notice] = "Successfully destroyed authentication."
    redirect_to authentications_url
  end

end
