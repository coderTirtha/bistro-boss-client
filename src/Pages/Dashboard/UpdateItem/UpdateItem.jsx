import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import { FaUtensils } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItem = () => {
    const { _id, name, price, recipe, category } = useLoaderData();
    const { register, handleSubmit } = useForm();
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
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            if (menuRes.data.modifiedCount > 0) {
                toast.success(`${data.name} successfully updated on the menu!`);
            }
        }
        console.log(res.data.data.display_url);
    }
    return (
        <div>
            <SectionTitle heading={'Update an item'} subHeading={"Wanna change?"}></SectionTitle>
            <div className="bg-base-200 rounded-md p-8 mx-10 my-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Name (*)</span>
                        </label>
                        <input defaultValue={name} {...register("name", { required: true })} type="text" placeholder="Recipe Name" className="input input-bordered" required />
                    </div>
                    <div className="flex gap-4">
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Category (*)</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })} className="select select-bordered w-full">
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
                            <input {...register("price", { required: true })} defaultValue={price} type="number" placeholder="Price" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details (*)</span>
                        </label>
                        <textarea defaultValue={recipe} {...register('recipe', { required: true })} className="textarea textarea-bordered" placeholder="Recipe Details"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image (*)</span>
                        </label>
                        <input type="file" {...register('image', { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <button className="btn mt-6 btn-block bg-[#D1A054] border-0 text-white hover:text-[#D1A054]">
                        Update Item
                        <FaUtensils />
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateItem;