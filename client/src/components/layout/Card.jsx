export default function Card() {
  return (
    <div className="card mb-4">
      <img src="..." className="h-40 bg-gray-200 object-cover" alt="..." />
      <div className="p-4">
        <h5 className="text-lg font-semi-bold">Card title</h5>
        <p className="text-gray-600">
          Some quick example text to build on card title and make rest of card
          content
        </p>
        <a href="" className="btn-primary mt-3"></a>
      </div>
    </div>
  );
}
