import { useContext, useEffect, useState } from 'react';
import loginImg from '../../assets/others/authentication1.png';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const { user, createUser } = useContext(AuthContext);
    const handleSignUp = event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        createUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
            })
            .catch(err => {
                console.error(err);
            })

    }
    return (
        <div className={`flex items-center gap-4 container mx-auto h-screen`}>
            <div className='flex-1'>
                <img src={loginImg} alt="" className='' />
            </div>
            <div className='flex-1'>
                <h1 className='text-4xl text-center font-bold'>Sign Up Now!</h1>
                <form className='my-6' onSubmit={handleSignUp}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                    </div>
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
                    <input type="submit" value="Sign Up" className='btn btn-block bg-[#D1A054B2] text-white mt-6 hover:text-[#D1A054B2]' />
                </form>
                <p className='text-[#D1A054] text-center'>Already have an account? <Link className='font-bold' to={'/login'}>Log in</Link></p>
            </div>
        </div>
    );
};

export default SignUp;