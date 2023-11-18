import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Item from "../../Shared/MenuItem/Item";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    return (
        <div className="my-16">
            <SectionTitle heading={"From Our Menu"} subHeading={"Popular Items"}></SectionTitle>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                {
                    popular.map(item => <Item key={item._id} item={item}></Item>)
                }
            </div>
            <div className="flex justify-center">
                <button className="btn btn-outline border-0 border-b-2">View Full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;