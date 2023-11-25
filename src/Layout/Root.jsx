import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='bg-black'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster position="top-center" />
        </div>
    );
};

export default Root;