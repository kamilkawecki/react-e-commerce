import { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";

export type Product = {
  id: string | number;
  name: string;
  price: number;
};

export type Products = Product[];

function App() {
  const [products, setProducts] = useState<Products>([]);

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
          name: responseData[key]?.name,
          price: responseData[key]?.price,
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
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
