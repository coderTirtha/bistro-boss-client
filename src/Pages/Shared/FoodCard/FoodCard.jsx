import React from 'react';

const FoodCard = ({ item }) => {
    const { name, recipe, image, price } = item;
    return (
        <div className='rounded-md shadow-lg p-4 relative'>
            <div>
                <img src={image} />
            </div>
            <p className='px-4 py-2 bg-slate-800 rounded absolute right-5 top-5 text-white'>${price}</p>
            <div className='flex flex-col gap-2 items-center my-6'>
                <h1 className='text-xl font-semibold'>{name}</h1>
                <p className='text-center'>{recipe}</p>
                <button className='btn btn-outline border-0 border-b-2 text-[#BB8506] border-b-[#BB8506] hover:text-[#BB8506] hover:border-b-[#BB8506]'>Add to Cart</button>
            </div>
        </div>
    );
};

export default FoodCard;