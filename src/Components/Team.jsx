import React from 'react';
import { AiFillInstagram, AiFillLinkedin} from 'react-icons/ai'
import { BiLogoFacebookCircle} from 'react-icons/bi'

const Team = () => {
    return (
        <div>
            <h2 className="text-center text-white text-5xl mt-12 font-medium">Our Team</h2>
            <p className="text-center text-white w-1/2 mx-auto text-lg mt-6">"Leading with a vision, our General Manager orchestrates the symphony of services, ensuring every guest feels at home."</p>
            <div className=' bg-base-300'>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 md:p-20 max-w-7xl mx-auto">
                <div data-aos="zoom-out-up" className="flex flex-col items-center bg-gray-800 py-10 rounded-lg">
                    <div className="w-[200px] h-[200px]">
                        <img src="https://react.keepdesign.io/images/avatar/avatar-4.png" alt="" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-3xl font-semibold text-white">Michael Doe</h2>
                        <p className="text-xl text-gray-400 mt-3">Founder <span className='font-mono'>&</span> CEO</p>
                    </div>
                    <div className='text-3xl text-gray-400 flex gap-2 mt-2'>
                        <AiFillInstagram></AiFillInstagram>
                        <BiLogoFacebookCircle></BiLogoFacebookCircle>
                        <AiFillLinkedin></AiFillLinkedin>
                    </div>
                </div>
                <div data-aos="zoom-out-up" className="flex flex-col items-center bg-gray-800 py-10 rounded-lg">
                    <div className="w-[200px] h-[200px]">
                        <img src="https://i.ibb.co/C60Lbjj/founder.jpg" alt="" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-3xl font-semibold text-white">Olivia Johnson </h2>
                        <p className="text-xl text-gray-400 mt-3">Human Resource Manager</p>
                    </div>
                    <div className='text-3xl text-gray-400 flex gap-2 mt-2'>
                        <AiFillInstagram></AiFillInstagram>
                        <BiLogoFacebookCircle></BiLogoFacebookCircle>
                        <AiFillLinkedin></AiFillLinkedin>
                    </div>
                </div>
                <div data-aos="zoom-out-up" className="flex flex-col items-center bg-gray-800 py-10 rounded-lg">
                    <div className="w-[200px] h-[200px]">
                        <img src="https://i.ibb.co/8XfCRyK/photographer.jpg" alt="" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-3xl font-semibold text-white">Sophia Brown</h2>
                        <p className="text-xl text-gray-400 mt-3">COO</p>
                    </div>
                    <div className='text-3xl text-gray-400 flex gap-2 mt-2'>
                        <AiFillInstagram></AiFillInstagram>
                        <BiLogoFacebookCircle></BiLogoFacebookCircle>
                        <AiFillLinkedin></AiFillLinkedin>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Team;