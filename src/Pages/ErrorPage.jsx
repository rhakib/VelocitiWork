import { Button } from 'keep-react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>

            <div className='flex flex-col items-center min-h-screen justify-center space-y-6'>
                <h2 className='font-bold text-4xl'>Page Not Found</h2>
                <p className='text-lg'>The page you are looking for doesn&#39;t exist or has been moved</p>
                <Link to='https://velocitiwork-ventures.web.app/'>
                    <Button className="rounded-xl" size="sm" type="primary">
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;