import { NavLink, Outlet } from 'react-router-dom';
import '../Components/Navbar.css'
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const DashBoard = () => {


    const isHr = true;
    const isEmployee = false;



    return (
        <div className='bg-black'>
            <NavBar></NavBar>
            <div className='flex max-w-screen-xl mx-auto pt-20'>
                <div className='w-64 min-h-screen bg-slate-700 text-white border-2 border-gray-500 '>
                    <ul className='flex nav flex-col gap-3 p-10 font-semibold text-xl'>
                        {
                            isHr &&
                            <>
                                <li className='border text-center  rounded-md py-2'><NavLink to='/dashboard/hrhome'>HR Home</NavLink></li>
                                <li className='border text-center  rounded-md py-2'><NavLink to='/dashboard/employeelist'>Employee List</NavLink></li>
                                <li className='border px-10 rounded-md py-2'><NavLink to='/dashboard/progress'>Progress</NavLink></li>
                            </>
                        }
                        {
                            isEmployee &&
                            <>
                                <li className='border text-center rounded-md py-2'><NavLink to='/dashboard/userHome'>Home</NavLink></li>
                                <li className='border text-center  rounded-md py-2'><NavLink to='/dashboard/workSheet'>Work Sheet</NavLink></li>
                                <li className='border text-center rounded-md py-2'><NavLink to='/dashboard/paymentHistory'>Payment History</NavLink></li>
                            </>

                        }
                    </ul>
                </div>
                <div className='flex-1 p-10'>
                    <Outlet></Outlet>
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoard;