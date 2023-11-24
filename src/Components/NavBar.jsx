import { Navbar, Button } from "keep-react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const NavBar = () => {
    const {user, logOutUser} = useAuth()
    return (
        <div>
            <Navbar fluid={true}>
                <Navbar.Container className="flex mx-auto w-full max-w-screen-xl items-center justify-between">
                    <Navbar.Container className="flex items-center">
                        <Navbar.Brand>
                            <Link to='/'><h2 className="font-bold text-xl">VelocitiWork-Ventures</h2></Link>
                        </Navbar.Brand>
                        <Navbar.Divider></Navbar.Divider>
                        <Navbar.Container
                            tag="ul"
                            className="lg:flex hidden items-center justify-between gap-8"
                        >
                            <Navbar.Link linkName="Home" />
                            <Navbar.Link linkName="Dashboard" />
                            <Navbar.Link linkName="Contact Us" />
                        </Navbar.Container>
                        <Navbar.Collapse collapseType="sidebar">
                            <Navbar.Container tag="ul" className="flex flex-col gap-5">
                                <Navbar.Link linkName="Home" />
                                <Navbar.Link linkName="Dashboard" />
                                <Navbar.Link linkName="Contact Us" />
                            </Navbar.Container>
                        </Navbar.Collapse>
                    </Navbar.Container>

                    <Navbar.Container className="flex gap-2">
                        {user? <Button onClick={logOutUser} size="sm" type="primary">
                                Logout
                            </Button>  :<Link to='/login'>
                            <Button size="sm" type="primary">
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