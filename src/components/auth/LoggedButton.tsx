import { Link } from "react-router-dom";

export const LoggedButton = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center bg-white rounded-md shadow-sm p-10">
        <p>Tu sesión esta activa</p>
      <Link to={"/products"} className="bg-dark-gradient text-white px-3 py-1.5 rounded-md">
        Entrar a la App
      </Link>
    </div>
  );
};
