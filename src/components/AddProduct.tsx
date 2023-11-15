import { ChangeEvent, useState } from "react";

import { v4 } from "uuid";
import {
  ref as storageref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./../firebase/firebase";
import { getDatabase, set as dbset, ref as dbref } from "firebase/database";

export type AddProduct = {
  fetchproducts: () => Promise<void>;
};

export type ProductImage = {
  url: string;
  name: string;
};

const AddProduct = ({ fetchproducts }: AddProduct) => {
  const [name, setName] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();

  const [imageUpload, setImageUpload] = useState<File | null>();
  const [image, setImage] = useState<ProductImage>({ url: "", name: "" });

  const pushProduct = () => {
    dbset(dbref(getDatabase(), "products/" + v4()), {
      name: name,
      price: price,
      image: { url: image.url, name: image.name },
    }).catch(alert);
    fetchproducts();
  };

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageName = `${imageUpload.name}-` + v4();
    const imageRef = storageref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage({ url: url, name: imageName });
      });
    });
  };
  return (
    <div>
      <h2>ADD PRODUCT</h2>
      <input
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="Enter product price"
        value={price}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPrice(e.target.value)
        }
      />
      <br />
      <br />
      <h2>ADD IMAGE</h2>
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0] as File | undefined;
          if (file) {
            setImageUpload(file);
          }
        }}
      />
      <button onClick={uploadFile}>Upload Image</button>
      <br />
      <button onClick={pushProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
