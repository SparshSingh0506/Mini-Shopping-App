import { NavLink } from "react-router-dom";

import { useCartContext } from '../../contexts/CartContext'

type Props = {
    handleSearch: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

export const Navbar = ({ handleSearch }: Props) => {
    const { items } = useCartContext();

    return (
        <nav className="bg-gray-900  w-full z-20 top-0 inset-s-0 border-b border-default">
            <div className="max-w-screen-7xl flex flex-wrap items-center 
            justify-between mx-auto p-0.5 px-5">

                {/*Brand Logo*/}
                <NavLink to="/" className="flex items-center space-x-3">
                    <img
                        src="../src/assets/react.svg"
                        className="h-7"
                        alt="Logo"
                    />

                    <span className="text-xl text-white font-semibold">Mini e-Shop</span>
                </NavLink>

                {/* Search */}
                <div>
                    <form onSubmit={handleSearch} className="flex items-center gap-1">
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="hidden md:block px-3 py-2 w-220 rounded bg-gray-100 text-black"
                        />

                        <button className="cursor-pointer p-2 text-white">
                            <img src="../src/assets/search.svg" alt="search" className="w-10 h-10" />
                        </button>
                    </form>
                </div>

                {/*Menu */}
                <ul className="hidden md:flex gap-6 text-white font-semibold text-2xl hover:scale-105">
                    <li>
                        <NavLink to='/cart' className="flex items-center space-x-3">
                            <span className="text-xl text-white font-semibold">Cart</span>

                            <div className="relative">
                                <img
                                    src="../src/assets/shopping-cart.svg"
                                    alt="cart"
                                    className="w-10 h-10"
                                />

                                {/* Badge */}
                                <span className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs 
                                font-semibold w-6 h-6 flex items-center justify-center rounded-full">
                                    {items.length}
                                </span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
