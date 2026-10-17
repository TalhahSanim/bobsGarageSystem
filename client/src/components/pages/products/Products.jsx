import { useState } from "react";
import SingleProduct from "./SingleProduct";
export default function Products() {
  // When using state wee require two things: The State variable and a setter function

  const [productList, setProductList] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      bodyType: "Sedan",
      description: "Sleek large sedan",
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80",
      price: "$38,990",
    },
    {
      id: 2,
      make: "Ford",
      model: "Ranger",
      bodyType: "Ute",
      description: "Tough dual-cab ute built for work and off-road",
      image:
        "https://images.unsplash.com/photo-1767566927815-04cf0631bfed?auto=format&fit=crop&w=800&q=80",
      price: "$56,990",
    },
    {
      id: 3,
      make: "Mazda",
      model: "CX-5",
      bodyType: "SUV",
      description: "Stylish mid-size family SUV",
      image:
        "https://images.unsplash.com/photo-1743114713466-f12a85992a75?auto=format&fit=crop&w=800&q=80",
      price: "$41,490",
    },
    {
      id: 4,
      make: "Volkswagen",
      model: "Golf GTI",
      bodyType: "Hatchback",
      description: "Sporty hot hatch with everyday practicality",
      image:
        "https://images.unsplash.com/photo-1767949374162-5cbb31071b8f?auto=format&fit=crop&w=800&q=80",
      price: "$54,990",
    },
    {
      id: 5,
      make: "Tesla",
      model: "Model 3",
      bodyType: "Sedan",
      description: "All-electric sedan with long range",
      image:
        "https://images.unsplash.com/photo-1700411881984-971bc29083bd?auto=format&fit=crop&w=800&q=80",
      price: "$54,900",
    },
    {
      id: 6,
      make: "Toyota",
      model: "Land Cruiser",
      bodyType: "SUV",
      description: "Legendary large 4WD for any terrain",
      image:
        "https://images.unsplash.com/photo-1650530579355-7ad9d4766043?auto=format&fit=crop&w=800&q=80",
      price: "$98,990",
    },
  ]);
  return (
    <main>
      <h2 className="mb-4 text-4xl font-semibold text-blue-500">
        Our Vehicles
      </h2>
      <div className=" grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Utilise productList.map to pass through each car */}

        {productList.map((car) => (
          <SingleProduct key={car.id} car={car} />
        ))}
      </div>
    </main>
  );
}
