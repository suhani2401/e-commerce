import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/auth.slice";
import { Button } from "./common/Button";
import { FaCartArrowDown } from "react-icons/fa";
import { ROUTES } from "../constant/routesPath";
import type { AuthState } from "../types";

const Navbar = (props: { title: string }) => {
    const loggedInUser = useSelector((state: { auth: AuthState }) => state.auth.loggedInUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => dispatch(logout());

    return (
        <nav className="shadow-md pb-2.5 mb-10">
            <div className="flex justify-between m-auto mt-3 p-1 max-w-7xl">
                <h1 className="text-black/60 cursor-pointer">{props.title}</h1>
                <div className="flex justify-center gap-10 mt-3 text-">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-800 underline underline-offset-6"
                                : "hover:text-blue-800 hover:underline hover:underline-offset-6"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-800 underline underline-offset-6"
                                : "hover:text-blue-800 hover:underline hover:underline-offset-6"
                        }
                    >
                        Orders
                    </NavLink>
                </div>
                <div className="flex justify-center align-middle gap-6 relative">
                    {loggedInUser && (
                        <>
                            {props.title !== "Cart" && (
                                <FaCartArrowDown
                                    className="size-7 mt-3 cursor-pointer"
                                    onClick={() => navigate(ROUTES.CART.path)}
                                />
                            )}
                        </>
                    )}
                    <NavLink to="/login">
                        <Button
                            onClickHandler={handleLogout}
                            type="button"
                            className="bg-blue-800 py-2 px-4 mt-1 rounded-xl"
                        >{loggedInUser ? "Logout" : "Login"}</Button>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
