import { AiOutlineGoogle } from 'react-icons/ai'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';



const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handeleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {               
                toast.success('Successfuly logged in')
                navigate(location?.state ? location.state : '/')
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    return (
        <div>
            <div className='flex mb-2 justify-center'>
                <button onClick={handeleGoogleSignIn} className='btn flex items-center gap-2 dark:text-white font-bold   border-none'><AiOutlineGoogle className='text-3xl text-green-500'></AiOutlineGoogle>Sign in with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;