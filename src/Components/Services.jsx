import { Button } from "keep-react";
import { TbCircleArrowUpRight, TbTopologyStar3 } from "react-icons/tb";
import { PiDiamondsFourFill } from "react-icons/pi";
import { GiLevelThree } from "react-icons/gi";
import { MdEditSquare } from "react-icons/md";








const Services = () => {
    return (
        <div className='max-w-screen-lg mx-auto mt-16 pb-8 space-y-8'>

            <div className="flex justify-between items-center my-12">
                <h2 className="text-6xl text-white font-semibold">Our Services</h2>
                <Button className="rounded-3xl" size="sm" type="primary">
                    Book a Free call
                </Button>
            </div>

            <div className='p-8 bg-gray-900 w-full flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                <h2 className='text-2xl text-left text-white font-bold flex items-center gap-2'> <TbTopologyStar3></TbTopologyStar3> WEB DESIGN & DEVELOPMENT</h2>
                <TbCircleArrowUpRight className="text-5xl text-white"></TbCircleArrowUpRight>
            </div>
            <div className='p-8 bg-gray-900 w-full flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                <h2 className='text-2xl text-left text-white font-bold flex items-center gap-2'><PiDiamondsFourFill></PiDiamondsFourFill> MOBILE APP DEVELOPMENT</h2>
                <TbCircleArrowUpRight className="text-5xl text-white"></TbCircleArrowUpRight>

            </div>
            <div className='p-8 bg-gray-900 w-full flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                <h2 className='text-2xl text-left text-white font-bold flex items-center gap-2'><GiLevelThree></GiLevelThree>BRANDING & IDENTITY</h2>
                <TbCircleArrowUpRight className="text-5xl text-white"></TbCircleArrowUpRight>

            </div>
            <div className='p-8 bg-gray-900 w-full flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                <h2 className='text-2xl text-left text-white font-bold flex items-center gap-2'><MdEditSquare></MdEditSquare>CUSTOM DESIGNS</h2>
                <TbCircleArrowUpRight className="text-5xl text-white"></TbCircleArrowUpRight>

            </div>


        </div>
    );
};

export default Services;