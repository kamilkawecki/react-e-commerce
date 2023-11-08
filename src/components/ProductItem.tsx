import { Product } from "../App";

function ProductItem({id, name, price}: Product) {
  return <div className="rounded-md border-black border p-4">
    <div>image</div>
    <div>{name}</div>
    <div>{price}</div>
    <button>Add to cart</button>
  </div>;
}

export default ProductItem;
