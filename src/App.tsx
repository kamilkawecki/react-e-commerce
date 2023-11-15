import { useCallback, useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";
import AddProduct, { ProductImage } from "./components/AddProduct";

export type Product = {
  id: string | number;
  name: string;
  price: number;
  image: ProductImage;
  fetchproducts?: () => Promise<void>;
};

export type Products = Product[];

function App() {
  const [products, setProducts] = useState<Products>([]);

  const fetchProducts: () => Promise<void> = useCallback(
    async () => {
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
          image: {url: responseData[key].image.url, name: responseData[key].image.name},
        });
      }

      console.log(responseData);

      setProducts(loadedProducts);
    }, []
  );

  useEffect(() => {
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
            image={product.image}
            fetchproducts={fetchProducts}
          />
        ))}
      </div>
      <AddProduct fetchproducts={fetchProducts} />
    </div>
  );
}

export default App;
