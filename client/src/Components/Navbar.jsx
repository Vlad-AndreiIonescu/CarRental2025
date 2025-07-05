import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token && token !== "undefined" && token !== "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="sticky top-0 z-50 bg-black shadow-md text-white">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center px-6 py-4">
        <h1
          className="text-2xl font-bold tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-amber-400">CAR</span>LUX
        </h1>
        <div className="relative space-x-4">
          {location.pathname !== "/" && (
            <button onClick={() => navigate("/")} className="hover:underline">
              Acasă
            </button>
          )}
          {isLoggedIn ? (
            <div className="inline-block relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded"
              >
                Contul Meu ⬇
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                  <button
                    onClick={handleProfileClick}
                    className="block w-full text-left px-4 py-2 hover:bg-amber-100"
                  >
                    Profilul Meu
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-amber-100"
                  >
                    Deconectare
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded"
            >
              Conectare
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
