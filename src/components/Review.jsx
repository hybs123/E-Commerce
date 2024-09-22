import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Review = (props) => {
    const { review, setReview,user,reviewloading,setreviewloading,renderStars } = useContext(ShopContext);
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!rating || !reviewText) {
            alert('Please fill out both fields.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3001/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ rating, review: reviewText, id: props.props, user: user.name }),
            });
    
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status} ${response.statusText}`);
            }
    
            // Parse the JSON response
            const result = await response.json();
            console.log('Review submitted successfully:', result);
    
            // Update review list in context
            if (setReview) {
                setReview(prevReviews => [...prevReviews, result.review]);
                setreviewloading(true);
            }
    
            // Reset form fields
            setRating('');
            setReviewText('');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <input 
                    type='number' 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)}
                    className='w-[30%] border border-gray-500 py-3' 
                    placeholder='Rating' 
                    max={5}
                    min={1} // Add min attribute if you want to ensure rating is between 1 and 5
                />
                <div className='flex flex-row'>
                    <input 
                        type='text' 
                        value={reviewText} 
                        onChange={(e) => setReviewText(e.target.value)}
                        className='w-full border border-gray-500 py-3' 
                        placeholder='Enter Review Here' 
                    />
                    <button 
                        type='submit' 
                        className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
                    >
                        Submit
                    </button>
                </div>
                <div>
                    {!reviewloading && review && review.map((item, index) => (
                        <div key={index} className='mt-3 px-3 py-3 border-t border-b border-gray-200'>
                        {item &&
                            <div>

                            <p><strong>{item.username}:</strong> <span className='text-yellow-500'>{renderStars(item.rating)}</span> </p>
                            <p>{item.review} </p>
                            </div>
                        }
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default Review;
