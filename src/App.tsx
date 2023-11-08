import { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/firebase";

export type Product = {
  id: string | number;
  name: string;
  price: number;
};

export type Products = Product[];

function App() {
  const [products, setProducts] = useState<Products>([]);

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
      });
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://react-e-commerce-da714-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );
      const responseData = await response.json();

      const loadedProducts: Products = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
        });
      }

      console.log(responseData);

      setProducts(loadedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="m-auto">
        <h2>PRODUCTS</h2>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
      <div>
        <h2>ADD PRODUCT</h2>
        <input
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0] as File | undefined;
            if(file){
              setImageUpload(file);
            }
          }}
        />
        <button onClick={uploadFile}> Upload Image</button>
      </div>
    </div>
  );
}

export default App;
