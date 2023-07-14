

import { useEffect, useState } from 'react';
import './App.css'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

interface IShoe  {
  title: string;
  brand: string;
  sizes: { size: number; price: number }[];
  colors: string[];
  images: [];
  reviews: [];
}

interface IShoes {
  data: IShoe[]
}

function App() {
  const [Shoes, setShoes] = useState<IShoes | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  useEffect(() => {
   void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/shoe/allshoes');
      const jsonData = await response.json() as IShoes;
      setShoes(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSizeClick = (size: number) => {
    setSelectedSize(size);
  };

const img = Shoes?.data[0].images
const sizes = Shoes?.data[0].sizes;

const images = img?.map((image, index) => ({
  original: image,
  thumbnail: image,
  originalAlt: `Image ${index}`,
  thumbnailAlt: `Thumbnail ${index}`
}));


  return (
    <div className='product-container'>
      <div  className='product-gallery'>
        {images && images.length > 0 && <ImageGallery 
        items={images} 
        showNav={false}
         />}
      </div>
      <div className='product-details'>
        <h1>{Shoes?.data[0].title}</h1>
        <h3>Brand - {Shoes?.data[0].brand}</h3>

        {selectedSize && sizes && sizes.length > 0 && (
       
            <h4>Price: $ {sizes.find((sizeObj) => sizeObj.size === selectedSize)?.price}</h4>
         
        )}
        {sizes && sizes.length > 0 && (
          <div>
            <h4>Select Size:</h4>
            {sizes.map((sizeObj, index) => (
              <button
              
                key={index}
                onClick={() => handleSizeClick(sizeObj.size)}
                className={selectedSize === sizeObj.size ? 'selected' : 'size-btn'}
              >
                {sizeObj.size}
              </button>
            ))}
          </div>
        )}
       <button className='buy-btn'>Order Now</button>
      </div>
    </div>
  )
}

export default App
