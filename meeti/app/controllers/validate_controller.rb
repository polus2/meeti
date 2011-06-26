class ValidateController < ApplicationController

  def validate

    if params.include? "user"
      if params["user"].include? "email"
        if User.find_by_email(params["user"]["email"])
          render :json => false
        else
          render :json => true
        end
        return
      end

      if params["user"].include? "phone"
        if User.find_by_phone(params["user"]["phone"])
          render :json => false
        else
          render :json => true
        end
        return
      end
    end

  end

end
