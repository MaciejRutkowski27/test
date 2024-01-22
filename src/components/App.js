import React, { useEffect, useState } from "react";
import CustomizationPopup from "./Popup";

function App() {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  function search(products) {
    return products.filter((product) => {
      return product["name"].toString().toLowerCase().includes(q.toLowerCase());
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const productsResponse = await fetch("/api/Product/AllProducts");
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch images for all products
        const imagePromises = productsData.map(async (product) => {
          try {
            const imagesResponse = await fetch(
              `/api/Product/ImagesOnProduct/${product.id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!imagesResponse.ok) {
              throw new Error(`HTTP error! Status: ${imagesResponse.status}`);
            }

            const imagesData = await imagesResponse.json();
            // Take only the first image for each product
            const firstImage = imagesData[0];
            return firstImage ? [firstImage] : [];
          } catch (error) {
            console.error(
              `Error fetching images for product ${product.id}:`,
              error.message
            );
            return []; // Return an empty array for error cases
          }
        });

        const imagesData = await Promise.all(imagePromises);
        setProductImages(imagesData.flat()); // Flatten the array of arrays
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="page">
        <div>
          <h1>Choose from existing products to add a new one to your venue</h1>
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            imperdiet odio interdum est ultrices egestas volutpat a metus.
          </h2>
        </div>
        <div className="content">
          <div className="top">
            <CustomizationPopup />
            <div className="search-wrapper">
              <label htmlFor="search-form">
                <input
                  type="search"
                  name="search-form"
                  id="search-form"
                  className="search-input"
                  placeholder="Search for..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <h2>Products</h2>
            <div className="images">
              {search(products).map((product) => {
                const productImage = productImages.find(
                  (image) => image.productId === product.id
                );

                // Check if the product has a valid image
                if (productImage && productImage.link) {
                  return (
                    <div key={product.id} className="item">
                      <img
                        className="itemImage"
                        src={productImage.link}
                        alt={productImage.name}
                      />
                      <p className="description">{product.name}</p>
                    </div>
                  );
                }

                return null; // Skip rendering if image is missing or invalid
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
