import { Link } from "react-router-dom";

export const Navbar = ({ handleSearch }) => {
    return (
        <nav className="bg-gray-700 fixed w-full z-20 top-0 inset-s-0 border-b border-default">
            <div className="max-w-screen-7xl flex flex-wrap items-center justify-between mx-auto p-2 px-5">

                {/*Brand Logo*/}
                <Link to="/" className="flex items-center space-x-3">
                    <img
                        src="../src/assets/react.svg"
                        className="h-7"
                        alt="Logo"
                    />

                    <span className="text-xl text-white font-semibold">Mini e-Shop</span>
                </Link>

                {/* Search */}
                <div>
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="hidden md:block px-3 py-2 rounded bg-gray-400 text-black"
                        />

                        <button className="p-2 text-white">
                            <img src="../src/assets/search.svg" alt="search" className="w-10 h-10" />
                        </button>
                    </form>
                </div>

                {/*     Menu */}
                <ul className="hidden md:flex gap-6 text-white font-semibold text-2xl">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/store'>Store</Link></li>
                </ul>

            </div>
        </nav>
    );
};
