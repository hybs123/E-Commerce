import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
    const { user, userloading, setuserloading } = useContext(ShopContext);
    const [img, setImg] = useState(null); // Initialize with null or undefined
    console.log('Profile', user);

    useEffect(() => {
        if (user && user.image && user.image.length > 0) {
            setImg(user.image[0]); // Set the first image path
            setuserloading(false); // Set loading to false once the image is loaded
        }
    }, [user]); // Dependency on `user` ensures this runs when `user` changes

    if (userloading) {
        return <p>Loading Profile...</p>; // Display loading message until image is available
    }

    return (
        <div>
            {img ? (
                <img className='max-w-[200px] border border-red-300 rounded-full' src={img} alt="Profile" />
            ) : (
                <p>No image available</p>
            )}
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.Address}</p>
            <p>{user.Phone}</p>
        </div>
    );
};

export default Profile;
