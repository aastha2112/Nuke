import Image from "next/image";
import React from "react";

const ProductCard = ({ shoe }) => {
  return (
    <div
      key={shoe.id}
      className="p-4 border rounded-lg shadow-sm relative w-full"
    >
      <Image
        src={
          "https://images.unsplash.com/photo-1509883488717-779cd2d85976?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt={shoe?.title}
        width={350}
        height={200}
        className="object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{shoe.title}</h2>
      <p className="text-gray-600">{shoe.description}</p>
      <p className="text-blue-500 font-bold">Rs. {shoe.price}</p>
    </div>
  );
};

export default ProductCard;

// {
//   "category": "Boots",
//   "color": "White",
//   "description": "Premium white boots designed for comfort and durability. Made from high-quality materials to suit every occasion.",
//   "gender": "Women",
//   "id": 1,
//   "images": [
//     "https://images.pexels.com/photos/2529151/",
//     "https://images.pexels.com/photos/5678901/",
//     "https://images.pexels.com/photos/6789012/"
//   ],
//   "other_colors": [
//     {
//       "color": "Red",
//       "image_url": "https://images.pexels.com/photos/2529151/"
//     },
//     {
//       "color": "Blue",
//       "image_url": "https://images.pexels.com/photos/5678901/"
//     }
//   ],
//   "price": 65,
//   "rating": 3.7,
//   "size": [
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10"
//   ],
//   "stock": 6,
//   "title": "White Boots"
// },
