import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Item from "./Item";

const PopularMenu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            const popular = data.filter(item => item.category === 'popular');
            setMenu(popular);
        })
    }, []);
    return (
        <div className="my-16">
            <SectionTitle heading={"From Our Menu"} subHeading={"Popular Items"}></SectionTitle>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                {
                    menu.map(item => <Item key={item._id} item={item}></Item>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;