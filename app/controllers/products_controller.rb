class ProductsController < ApplicationController
  def index
    respond_with Product.all
  end

  def create
    respond_with Product.create(product_params)
  end

  def show
    respond_with Product.find(params[:id])
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :price)
  end
end
