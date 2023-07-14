/* eslint-disable @typescript-eslint/no-misused-promises */


import { useEffect, useState } from 'react';
import './App.css'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Navigation from './shared/Navigation';

interface IShoe  {
  _id: string;
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
  const [reviewText, setReviewText] = useState<string>('');
  useEffect(() => {
   void fetchData();
  }, [reviewText]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('https://e-commerce-puce-five.vercel.app/api/v1/shoe/allshoes');
      const jsonData = await response.json() as IShoes;
      setShoes(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSizeClick = (size: number) => {
    setSelectedSize(size);
  };

  const handleReviewSubmit = async (event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch('https://e-commerce-puce-five.vercel.app/api/v1/shoe/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          id: Shoes?.data[0]._id,
          review: reviewText 
         
        })
      });
      if(response.status === 200){
        alert('Review Submitted')
        setReviewText('')
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
    
  };

  const handleReviewTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };
const email = localStorage.getItem('email');

  const handleOrder =async () =>{
    try {
      const response = await fetch('https://e-commerce-puce-five.vercel.app/api/v1/order/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          productId: Shoes?.data[0]._id,
          title: Shoes?.data[0].title,
          email: email
        })
      });
      if(response.status === 200){
        alert('Order place done!')
        setReviewText('')
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  }

const img = Shoes?.data[0].images
const sizes = Shoes?.data[0].sizes;
const reviews = Shoes?.data[0].reviews;

const images = img?.map((image, index) => ({
  original: image,
  thumbnail: image,
  originalAlt: `Image ${index}`,
  thumbnailAlt: `Thumbnail ${index}`
}));


  return (
    <>
    <Navigation/>
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
      { sizes && sizes.length > 0 && (
          <h4>Price: $ {selectedSize ? sizes.find((sizeObj) => sizeObj.size === selectedSize)?.price : sizes[0].price}</h4>
       
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
     <button onClick={()=> handleOrder()} className='buy-btn'>Order Now</button>
    </div>
  </div>
  <div className='review-container'>
         <h1>Please add your review</h1> 
          <form onSubmit={handleReviewSubmit}>
          <textarea
            placeholder='Add your review'
            value={reviewText}
            onChange={handleReviewTextChange}
          /> <br />
          <button type='submit'>Submit</button>
        </form>

        {
          reviews && reviews.length >0 &&(
            <div>
              <h3>Read all reviews</h3>
              {reviews.map((review, index) => (
                 <h2 key={index}>{review}</h2>
              ))}
            </div>
          )
        }

        
         
  </div>
  
    </>
  )
}

export default App
