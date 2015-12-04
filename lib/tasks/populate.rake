namespace :db do
  desc 'Fill database with sample data'
  task populate: :environment do
    1.upto(30) do |n|
      Product.create!(name: "Product ##{n}",
                      description: 'awesome!',
                      price: n * 10)
    end
  end
end
