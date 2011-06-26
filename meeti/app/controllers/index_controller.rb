class IndexController < ApplicationController

  def home

    if current_user
      redirect_to dashboards_index_path
    end

  end

  def how_to_sign_up
    render "auth/index"
  end

end
