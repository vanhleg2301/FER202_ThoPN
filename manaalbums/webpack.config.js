import path from 'path'; // Import thư viện path của Node.js

module.exports = {
  entry: './src/index.js', // Điểm vào của ứng dụng
  output: {
    filename: 'bundle.js', // Tên file đầu ra
    path: path.resolve(__dirname, 'dist'), // Thư mục đầu ra
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Áp dụng cho các file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: {
          loader: 'babel-loader', // Sử dụng Babel loader
        },
      },
      {
        test: /\.css$/, // Áp dụng cho các file .css
        use: ['style-loader', 'css-loader'], // Sử dụng style-loader và css-loader
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Thư mục chứa nội dung
    compress: true, // Bật nén
    port: 9000, // Cổng của dev server
  },
};