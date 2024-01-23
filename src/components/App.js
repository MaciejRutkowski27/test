// import React, { useEffect, useState } from "react";
// import CustomizationPopup from "./Popup";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [productImages, setProductImages] = useState([]);
//   const [q, setQ] = useState("");
//   const [searchParam] = useState(["name"]);
//   function search(products) {
//     return products.filter((product) => {
//       return product["name"].toString().toLowerCase().includes(q.toLowerCase());
//     });
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch all products
//         const productsResponse = await fetch("/api/Product/AllProducts");
//         const productsData = await productsResponse.json();
//         setProducts(productsData);

//         // Fetch images for all products
//         const imagePromises = productsData.map(async (product) => {
//           try {
//             const imagesResponse = await fetch(
//               `/api/Product/ImagesOnProduct/${product.id}`,
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               }
//             );

//             if (!imagesResponse.ok) {
//               throw new Error(`HTTP error! Status: ${imagesResponse.status}`);
//             }

//             const imagesData = await imagesResponse.json();
//             // Take only the first image for each product
//             const firstImage = imagesData[0];
//             return firstImage ? [firstImage] : [];
//           } catch (error) {
//             console.error(
//               `Error fetching images for product ${product.id}:`,
//               error.message
//             );
//             return []; // Return an empty array for error cases
//           }
//         });

//         const imagesData = await Promise.all(imagePromises);
//         setProductImages(imagesData.flat()); // Flatten the array of arrays
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="page">
//         <div>
//           <h1>Choose from existing products to add a new one to your venue</h1>
//           <h2>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
//             imperdiet odio interdum est ultrices egestas volutpat a metus.
//           </h2>
//         </div>
//         <div className="content">
//           <div className="top">
//             <CustomizationPopup />
//             <div className="search-wrapper">
//               <label htmlFor="search-form">
//                 <input
//                   type="search"
//                   name="search-form"
//                   id="search-form"
//                   className="search-input"
//                   placeholder="Search for..."
//                   value={q}
//                   onChange={(e) => setQ(e.target.value)}
//                 />
//               </label>
//             </div>
//           </div>
//           <div className="row">
//             <h2>Products</h2>
//             <div className="images">
//               {search(products).map((product) => {
//                 const productImage = productImages.find(
//                   (image) => image.productId === product.id
//                 );

//                 // Check if the product has a valid image
//                 if (productImage && productImage.link) {
//                   return (
//                     <div key={product.id} className="item">
//                       <img
//                         className="itemImage"
//                         src={productImage.link}
//                         alt={productImage.name}
//                       />
//                       <p className="description">{product.name}</p>
//                     </div>
//                   );
//                 }

//                 return null; // Skip rendering if image is missing or invalid
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import CustomizationPopup from "./Popup";
import ImageContainer from "./ImageHeatmap";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [hotspotContents, setHotspotContents] = useState({});
  const [hotspots, setHotspots] = useState([
    { id: 1, x: 275, y: 730 },
    { id: 2, x: 450, y: 500 },
    { id: 3, x: 910, y: 730 },
  ]);
  const [productImages, setProductImages] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  function search(products) {
    return products.filter((product) => {
      return product["name"].toString().toLowerCase().includes(q.toLowerCase());
    });
  }
  const handleHotspotClick = (hotspotId) => {
    // Customize the content based on the hotspotId
    let title, description;

    switch (hotspotId) {
      case 1:
        title = "Chair";
        description = "Perfect to sit and read a book in";
        break;
      case 2:
        title = "Curtains";
        description = "Elegant and sunproof";
        break;
      case 3:
        title = "Pillow";
        description = "Soft and comfy";
        break;
      // Add more cases for other hotspots as needed

      default:
        title = "Default Title";
        description = "Default Description";
    }

    const contentForHotspot = {
      title,
      description,
    };

    setHotspotContents((prevContents) => ({
      ...prevContents,
      [hotspotId]: contentForHotspot,
    }));

    // Handle hotspot click, e.g., select the associated product
    setActiveHotspot(hotspotId);
    const selectedHotspot = hotspots.find(
      (hotspot) => hotspot.id === hotspotId
    );
    setSelectedProducts((prevSelected) => [...prevSelected, selectedHotspot]);
  };
  const handleClosePopup = () => {
    // Implement logic to close the popup
    setActiveHotspot(null);
  };

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ImageContainer
            imageUrl="https://hips.hearstapps.com/hmg-prod/images/edc080123reddkaihoi-009-645aba4daf6e1.jpg?crop=0.691xw:1.00xh;0.159xw,0&resize=1200:*"
            hotspots={hotspots}
            onHotspotClick={handleHotspotClick}
            activeHotspot={activeHotspot}
            hotspotContents={hotspotContents}
            onClosePopup={handleClosePopup}
          />
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

