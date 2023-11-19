import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import shopCoverImg from '../../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import TabCategory from "../TabCategory/TabCategory";

const Shop = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();
    const salads = menu.filter(item => item.category === "salad");
    const pizzas = menu.filter(item => item.category === "pizza");
    const soups = menu.filter(item => item.category === "soup");
    const desserts = menu.filter(item => item.category === "dessert");
    const drinks = menu.filter(item => item.category === "drinks");
    return (
        <div>
            <Helmet>
                <title>Shop | Bistro Boss</title>
            </Helmet>
            <Cover img={shopCoverImg} title={"Our Shop"} description={"Would you like to try a dish?"}></Cover>
            <div className="container mx-auto my-12">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="flex justify-center">
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soups</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>
                    </TabList><hr />
                    <div className="my-8">
                        <TabPanel>
                            <TabCategory items={salads}></TabCategory>
                        </TabPanel>
                        <TabPanel>
                            <TabCategory items={pizzas}></TabCategory>
                        </TabPanel>
                        <TabPanel>
                            <TabCategory items={soups}></TabCategory>
                        </TabPanel>
                        <TabPanel>
                            <TabCategory items={desserts}></TabCategory>
                        </TabPanel>
                        <TabPanel>
                            <TabCategory items={drinks}></TabCategory>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Shop;