import { Product } from "../App";
import { getDatabase as dbgetDatabase, ref as dbref, remove as dbremove } from "firebase/database";
import { getStorage, ref as stref, deleteObject } from "firebase/storage";
import { ProductImage } from "./AddProduct";

function ProductItem({id, image, name, price, fetchproducts}: Product) {
  const removeProduct = (id: string | number, image: ProductImage) => {
    dbremove(dbref(dbgetDatabase(), 'products/' + id))
    .then(() => {
      // Data saved successfully!
    })
    .catch((error) => {
      // The write failed...
    });
    if(image.url) {
      deleteObject(stref(getStorage(), 'images/' + image.name))
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
    }
    fetchproducts && fetchproducts();
  }
  return <div className="rounded-md border-black border p-4">
    {image.url && <img src={image.url} alt="image" />}
    <div>{name}</div>
    <div>{price}</div>
    <button>Add to cart</button>
    <br />
    <button onClick={() =>removeProduct(id, image)}>Remove item</button>
  </div>;
}

export default ProductItem;
