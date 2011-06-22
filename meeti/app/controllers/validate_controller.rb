class ValidateController < ApplicationController

  def validate

    if params.include? "user"
      if params["user"].include? "email"
        render :json => true
        return
      end

      if params["user"].include? "phone"
        render :json => true
        return
      end
    end

  end

end
