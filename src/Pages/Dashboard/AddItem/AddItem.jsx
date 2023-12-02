import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItem = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                price: parseFloat(data.price),
                category: data.category
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            if (menuRes.data.insertedId) {
                reset();
                toast.success(`${data.name} successfully added to the menu!`);
            }
        }
        console.log(res.data.data.display_url);
    }
    return (
        <div>
            <Helmet>
                <title>Dashboard | Add Item</title>
            </Helmet>
            <SectionTitle heading={"Add An Item"} subHeading={"What's New?"}></SectionTitle>
            <div className="bg-base-200 rounded-md p-8 mx-10 my-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Name (*)</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Recipe Name" className="input input-bordered" required />
                    </div>
                    <div className="flex gap-4">
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Category (*)</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })} className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value={"salad"}>Salad</option>
                                <option value={"pizza"}>Pizza</option>
                                <option value={"soup"}>Soup</option>
                                <option value={"dessert"}>Dessert</option>
                                <option value={"drinks"}>Drinks</option>
                            </select>
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Price (*)</span>
                            </label>
                            <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details (*)</span>
                        </label>
                        <textarea {...register('recipe', { required: true })} className="textarea textarea-bordered" placeholder="Recipe Details"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image (*)</span>
                        </label>
                        <input type="file" {...register('image', { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <button className="btn mt-6 btn-block bg-[#D1A054] border-0 text-white hover:text-[#D1A054]">
                        Add Item
                        <FaUtensils />
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddItem;