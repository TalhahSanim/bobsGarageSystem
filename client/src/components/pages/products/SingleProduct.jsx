export default function SingleProduct({ car }) {
  return (
    <div className="card bg-blue-300">
      <img
        src={car.image}
        alt={car.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h5 className="text-lg font-semibold">
          {car.make} {car.model}
        </h5>
        <p className="text-gray-600">{car.description}</p>
        <p className="my-2 text-end font-bold">{car.price}</p>
        <a href="#" className=" btn-primary">
          More Details
        </a>
        <a href="#" className=" btn-primary ">
          Save to Favourites
        </a>
      </div>
    </div>
  );
}
