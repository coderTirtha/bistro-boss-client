import { useContext, useEffect, useRef, useState } from 'react';
import loginImg from '../../assets/others/authentication1.png';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const {user, signInUser} = useContext(AuthContext);
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
            console.log(user);
        })
        .catch(err => {
            console.error(err);
        })

    }
    const handleCaptchaValidation = event => {
        event.preventDefault();
        const value = captchaRef.current.value;
        if(validateCaptcha(value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    return (
        <div className={`flex items-center gap-4 container mx-auto h-screen`}>
            <div className='flex-1'>
                <img src={loginImg} alt="" className='' />
            </div>
            <div className='flex-1'>
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
            </div>
        </div>
    );
};

export default Login;