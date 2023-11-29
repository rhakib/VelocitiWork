import { Navbar, Button } from "keep-react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import './Navbar.css'
import useAdmin from "../Hooks/useAdmin";
import useHR from "../Hooks/useHR";
import { useState } from "react";

const NavBar = () => {
    const { user, logOutUser } = useAuth()
    const [isAdmin, ,] = useAdmin()
    const [isHR, ,] = useHR()
 


    const [dropDown, setDropDown] = useState(false)    

    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

    return (
        <div className="w-full bg-black" >
            <Navbar className="bg-black z-10 bg-opacity-70 text-white" fluid={true}>
                <Navbar.Container className="flex mx-auto w-full max-w-screen-xl items-center justify-between">
                    <Navbar.Container className="flex items-center">
                        <Navbar.Brand>
                            <Link to='/'><h2 className="font-bold text-xl">VelocitiWork-Ventures</h2></Link>
                        </Navbar.Brand>
                        <Navbar.Divider></Navbar.Divider>
                        <Navbar.Container
                            tag="ul"
                            className="lg:flex hidden nav navbarText text-white items-center justify-between gap-8">
                            <NavLink to='/'><Navbar.Link linkName="Home" /></NavLink>
                            {isHR && <NavLink to='/dashboard/hrhome'><Navbar.Link linkName="Dashboard" /></NavLink>}
                            {isAdmin && <NavLink to='/dashboard/adminhome'><Navbar.Link linkName="Dashboard" /></NavLink>}
                            {user && !isAdmin && !isHR && <NavLink to='/dashboard/userhome'><Navbar.Link linkName="Dashboard" /></NavLink>}

                            <NavLink to='/contact' className={({ isActive }) => isActive ? 'btn btn-outline btn-sm' : 'btn btn-ghost btn-sm'} ><Navbar.Link linkName="Contact Us" /></NavLink>
                        </Navbar.Container>
                        <Navbar.Collapse collapseType="sidebar">
                            <Navbar.Container tag="ul" className="flex flex-col gap-5">
                                <Navbar.Link linkName="Home" />
                                <Navbar.Link linkName="Dashboard" />
                                <NavLink to='/contact' className={({ isActive }) => isActive ? 'btn btn-outline btn-sm' : 'btn btn-ghost btn-sm'} ><Navbar.Link linkName="Contact Us" /></NavLink>
                            </Navbar.Container>
                        </Navbar.Collapse>
                    </Navbar.Container>

                    <Navbar.Container className="flex gap-2">
                        {user ?
                            <>
                                <div onClick={handleDropDown} className="relative inline-block text-left">
                                    <div className="mr-3">
                                        <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="w-12 h-12 rounded-full" src={user?.photoURL}  />
                                        </button>
                                    </div>                          

                                    <div className={`${!dropDown ? 'hidden' : "absolute right-12 z-10  w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                           
                                       
                                            
                                                <button onClick={()=>logOutUser()} type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                                           
                                        </div>
                                    </div>
                                </div>

                            </>
                            : <Link to='/login'>
                                <Button className="rounded-3xl" size="sm" type="primary">
                                    Login
                                </Button>
                            </Link>}
                        <Navbar.Toggle />
                    </Navbar.Container>
                </Navbar.Container>
            </Navbar>
        </div>
    );
};

export default NavBar;