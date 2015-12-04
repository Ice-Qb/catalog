class ProductsController < InheritedResources::Base
  respond_to :json, only: [:show, :index]

  def index
    respond_with Product.all
  end

  def show
    respond_with Product.find(params[:id])
  end
end
