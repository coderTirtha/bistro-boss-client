import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Menu | Bistro Boss</title>
            </Helmet>
            <Cover img={menuImg} title={"Our Menu"} description={"Would you like to try a dish?"}></Cover>
            <SectionTitle heading={"Today's Offer"} subHeading={"Don't Miss"}></SectionTitle>
            <CategoryMenu category="offered"></CategoryMenu>
            <Cover img={dessertImg} title={"Desserts"} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></Cover>
            <CategoryMenu category="dessert"></CategoryMenu>
            <Cover img={pizzaImg} title={"Pizzas"} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></Cover>
            <CategoryMenu category="pizza"></CategoryMenu>
            <Cover img={saladImg} title={"Salads"} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></Cover>
            <CategoryMenu category="salad"></CategoryMenu>
            <Cover img={soupImg} title={"Soups"} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></Cover>
            <CategoryMenu category="soup"></CategoryMenu>
        </div>
    );
};

export default Menu;