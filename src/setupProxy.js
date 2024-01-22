const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/Product/AllProducts",
    createProxyMiddleware({
      target: "https://reevelawebapi.azurewebsites.net",
      changeOrigin: true,
    })
  );


 app.use(
    "/api/Product/ImagesOnProduct",
    createProxyMiddleware({
      target: "https://reevelawebapi.azurewebsites.net",
      changeOrigin: true,
      pathRewrite: (path, req) => {
        // Extract the product ID from the request path and append it to the new path
        const productId = path.split("/").pop();
        return `/api/Product/ImagesOnProduct/${productId}`;
      },
    })
  );
};