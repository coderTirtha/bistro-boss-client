import useMenu from "../../../hooks/useMenu";
import Item from "../../Shared/MenuItem/Item";

const CategoryMenu = ({ category }) => {
    const [menu, loading] = useMenu();
    const filteredMenu = menu.filter(item => item.category === category);
    return (
        <div className="my-12">
            {
                loading ?
                    <div className="flex gap-4 container mx-auto">
                        <div className="flex gap-4 items-center flex-1">
                            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-20"></div>
                                <div className="skeleton h-4 w-28"></div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center flex-1">
                            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-20"></div>
                                <div className="skeleton h-4 w-28"></div>
                            </div>
                        </div>
                    </div> :
                    <>
                        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                            {
                                filteredMenu.map(item => <Item key={item._id} item={item}></Item>)
                            }
                        </div>
                        <div className="flex justify-center">
                            <button className="btn btn-outline border-0 border-b-2">Order Your Favorite Food</button>
                        </div>
                    </>

            }
        </div>
    );
};

export default CategoryMenu;