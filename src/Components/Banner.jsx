import Marquee from "react-fast-marquee";
import { FaCheckCircle } from "react-icons/fa";



const Banner = () => {
    return (
        <div>
            <div className='min-h-screen' style={{ backgroundImage: 'url("https://i.ibb.co/G3mX7SB/bannerbg.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="pt-40 bg-black bg-opacity-60 min-h-screen ">
                    <h1 className='text-center text-9xl text-white'>We are a full <br />
                        service digital <br />
                        agency
                    </h1>
                </div>
            </div>
            <Marquee className="text-white ">
                <div className="flex gap-3">
                    <div className='p-2 py-3 ml-4 bg-gray-900  flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                        <h2 className='text-base text-white font-semibold flex items-center gap-3'>
                            <FaCheckCircle></FaCheckCircle>
                            Highly skil led with creative teams
                        </h2>
                    </div>
                    <div className='p-2 bg-gray-900  flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                        <h2 className='text-base text-white font-semibold flex items-center gap-3'>
                            <FaCheckCircle></FaCheckCircle>
                           Our Team's Skills, Your Success.
                        </h2>
                    </div>
                    <div className='p-2 bg-gray-900  flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                        <h2 className='text-base text-white font-semibold flex items-center gap-3'>
                            <FaCheckCircle></FaCheckCircle>
                            Unleashing Expertise, Elevating Brands.
                        </h2>
                    </div>
                    <div className='p-2 bg-gray-900  flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                        <h2 className='text-base text-white font-semibold flex items-center gap-3'>
                            <FaCheckCircle></FaCheckCircle>
                            Turning Ideas into Stunning Websites and Graphics.
                        </h2>
                    </div>
                    <div className='p-2 bg-gray-900  flex justify-between rounded-lg border-gray-600 border-2 shadow-xl'>
                        <h2 className='text-base text-white font-semibold flex items-center gap-3'>
                            <FaCheckCircle></FaCheckCircle>
                            Creative Designers – Your Vision, Our Expertise.
                        </h2>
                    </div>
                    
                </div>
            </Marquee>

        </div>
    );
};

export default Banner;