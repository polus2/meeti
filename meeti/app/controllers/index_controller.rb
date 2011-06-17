class IndexController < ApplicationController

  def home

  end

  def how_to_sign_up
    render "auth/index"
  end

end
