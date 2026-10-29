import logo from "../../assets/bobsLog.png";

export default function Footer() {
  // Data Class in JavaScript
  //Temporal API
  const date = new Date();
  return (
    <footer className="bg-linear-to-br from-cyan-300 to-blue-600 text-blue">
      <p className="me-6 py-6 text end text-blue">
        copyright {String.fromCharCode(169)}
        {" " + date.getFullYear() + " "}
        Bob's Garage
      </p>
      <img src={logo} alt="Bob's Garage logo" className="w-60 h-30" />
    </footer>
  );
}
