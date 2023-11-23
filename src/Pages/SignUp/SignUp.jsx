import { useContext, useEffect, useState } from 'react';
import loginImg from '../../assets/others/authentication1.png';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignUp = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then(res => {
            updateUser(res.user, data.name, data.photo)
            .then(res => {
                toast.success("User Profile created successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            })
            .catch(error => {
                toast.error(error.message);
            })
        })
        .catch(error => {
            toast.error(error.message);
        })
    }
    return (
        <>
            <Helmet>
                <title>Sign Up | Bistro Boss</title>
            </Helmet>
            <div className={`flex flex-row-reverse items-center gap-4 container mx-auto h-screen`}>
                <div className='flex-1'>
                    <img src={loginImg} alt="" className='' />
                </div>
                <div className='flex-1'>
                    <h1 className='text-4xl text-center font-bold'>Sign Up Now!</h1>
                    <form className='my-6' onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register('name', { required: true })} type="text" name='name' placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className='text-red-500'>* Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input {...register('photo', { required: true })} type="url" name='photo' placeholder="Photo URL" className="input input-bordered" />
                            {errors.photo && <span className='text-red-500'>* Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register('email', { required: true })} type="email" name='email' placeholder="Email" className="input input-bordered" />
                            {errors.email && <span className='text-red-500'>* Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register('password', { required: true, minLength: 6, maxLength: 32, pattern: /(?=[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])./ })} type="password" name='password' placeholder="Password" className="input input-bordered" />
                            {errors.password?.type === "required" && <span className='text-red-500'>* Password is required</span>}
                            {errors.password?.type === "minLength" && <span className='text-red-500'>* Password must be at least 6 characters long</span>}
                            {errors.password?.type === "maxLength" && <span className='text-red-500'>* Password can not be more than 32 characters</span>}
                            {errors.password?.type === "pattern" && <span className='text-red-500'>* Password must contain one uppercase, one lowercase, one number and at least a special character</span>}
                        </div>
                        <input type="submit" value="Sign Up" className='btn btn-block bg-[#D1A054B2] text-white mt-6 hover:text-[#D1A054B2]' />
                    </form>
                    <p className='text-[#D1A054] text-center'>Already have an account? <Link className='font-bold' to={'/login'}>Log in</Link></p>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default SignUp;