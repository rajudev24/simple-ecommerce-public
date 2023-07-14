

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



const img = Shoes?.data[0].images

const images = img?.map((image, index) => ({
  original: image,
  thumbnail: image,
  originalAlt: `Image ${index}`,
  thumbnailAlt: `Thumbnail ${index}`
}));


  return (
    <div >
      <div >
        {images && images.length > 0 && <ImageGallery items={images} />}
      </div>
      <div></div>
    </div>
  )
}

export default App
