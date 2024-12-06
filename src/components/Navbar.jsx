import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import avatar from '../assets/avatar.png'
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
const navigation = [
  {name:"Dashboard",href:"/dashboard"},
  {name:"Order",href:"/orders"},
  {name:"Cart Page",href:"/cartPage"},
  {name:"Check Out",href:"/checkOut"}
]

const Navbar = () => {
  const [isDropdownOpen,setIsDropdownOpen] = useState(false);
  const {currentUser,logOut} = useAuth();
  const cartItem = useSelector(state => state.cart.cartItem)
  console.log(cartItem)
  const handleLogOut = () =>{
    logOut();
  }
  return (
    <header className="max-w-screen-2xl md:mx-24 md:px-10 px-4 py-6">
      <nav className="w-full flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>

          <div className="relative md:w-72 w-40 space-x-2">
            <IoIosSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EAEAEA] py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>
        {/* right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={()=>{setIsDropdownOpen(!isDropdownOpen)}}>
                  <img src={avatar} alt="" className={`size-7 rounded-full ${currentUser?'ring-2 ring-blue-500':''}`} />
                </button>
                {
                  isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                      <ul className="py-2">
                        {navigation.map((item)=>(
                          <li key={item.name} onClick={()=>setIsDropdownOpen(false)}>
                            <Link to={item.href} className="block px-4 py-2 hover:bg-gray-100 text-sm"> {item.name} </Link>
                          </li>
                        ))}
                        <li className="">
                          <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">LogOut</button>
                        </li>
                      </ul>
                    </div>
                  )
                }
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart className="" />
            {cartItem.length > 0 ? <span className="text-sm font-semibold sm:ml-1">{cartItem.length}</span> : <span className="text-sm font-semibold sm:ml-1">0</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
