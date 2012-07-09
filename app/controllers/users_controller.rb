# Courseware Users Controller class
class UsersController < ApplicationController

  skip_before_filter :require_login, :only => [:new, :create, :activate]

  # Handles user creation screen
  def new
    @user = User.new
  end

  # Handles user creation
  def create
    @user = User.new(params[:user].except(:username))
    @user.username = params[:user][:username]

    if @user.save
      flash[:success] = _('Please check your email to finish registration.')
      redirect_to(root_url)
    else
      flash.now[:alert] = _(
        'We encountered errors. Please correct the highlighted fields.'
      )
      render :new
    end

  end

  # Handles user activation
  def activate
    if (@user = User.load_from_activation_token(params[:id]))
      flash[:success] = _('Success! Your account was activated.')
      @user.activate!
      redirect_to(login_path)
    else
      not_authenticated
    end
  end

end
