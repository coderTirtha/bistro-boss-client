import { useContext, useEffect, useRef, useState } from 'react';
import loginImg from '../../assets/others/authentication1.png';
import { FcGoogle } from "react-icons/fc";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);
    const handleLogin = event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        signInUser(email, password)
            .then(res => {
                const user = res.user;
                toast.success("User logged in successfully!");
                setTimeout(() => {
                    navigate(`${location?.state?.from?.pathname ? location.state.from.pathname : '/'}`, { replace: true });
                }, 3000);
            })
            .catch(err => {
                toast.error(err.message);
            })

    }
    const handleCaptchaValidation = event => {
        event.preventDefault();
        const value = captchaRef.current.value;
        if (validateCaptcha(value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res => {
            toast.success("User logged in successfully!");
            const userInfo = {
                name: res.user?.displayName,
                email: res.user?.email
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                if(res.data.insertedId) {
                    toast.success("User info saved!");
                }
            });
            navigate(`${location?.state?.from?.pathname ? location.state.from.pathname : '/'}`, { replace: true });
        })
        .catch(error => {
            toast.error(error.message);
        })
    }
    return (
        <>
            <Helmet>
                <title>Login | Bistro Boss</title>
            </Helmet>
            <div className={`flex items-center gap-4 container mx-auto min-h-screen`}>
                <div className='flex-1'>
                    <img src={loginImg} alt="" className='' />
                </div>
                <div className='flex-1 py-8'>
                    <h1 className='text-4xl text-center font-bold'>Login Now!</h1>
                    <form className='my-6' onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <div className='flex items-center gap-2'>
                                <input ref={captchaRef} type="text" name='captcha' placeholder="Write down the captcha here" className="input input-bordered flex-1" required />
                                <button onClick={handleCaptchaValidation} className='btn btn-sm btn-warning'>Validate</button>
                            </div>
                        </div>
                        <input disabled={disabled} type="submit" value="Login" className='btn btn-block bg-[#D1A054B2] text-white mt-6 hover:text-[#D1A054B2]' />
                    </form>
                    <p className='text-[#D1A054] text-center'>Don't have an account? <Link to={'/signup'} className='font-bold'>Sign Up</Link></p>
                    <div className='divider'></div>
                    <div className='text-center'>
                        <p>Sign in With</p>
                        <button onClick={handleGoogleSignIn} className='btn btn-outline btn-circle'><FcGoogle className='text-xl' /></button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;