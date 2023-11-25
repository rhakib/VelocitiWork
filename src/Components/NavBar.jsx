import { Navbar, Button } from "keep-react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import './Navbar.css'

const NavBar = () => {
    const {user, logOutUser} = useAuth()
    return (
        <div className="w-full fixed" >
            <Navbar className="bg-black z-10 bg-opacity-70 text-white" fluid={true}>
                <Navbar.Container className="flex mx-auto w-full max-w-screen-xl items-center justify-between">
                    <Navbar.Container className="flex items-center">
                        <Navbar.Brand>
                            <Link to='/'><h2 className="font-bold text-xl">VelocitiWork-Ventures</h2></Link>
                        </Navbar.Brand>
                        <Navbar.Divider></Navbar.Divider>
                        <Navbar.Container
                            tag="ul"
                            className="lg:flex hidden navbarText text-white items-center justify-between gap-8">
                            <NavLink to='/'><Navbar.Link linkName="Home" /></NavLink>
                            <NavLink to='/dashboard'><Navbar.Link linkName="Dashboard" /></NavLink>
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
                        {user? <Button className="rounded-3xl" onClick={logOutUser} size="sm" type="primary">
                                Logout
                            </Button>  :<Link to='/login'>
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