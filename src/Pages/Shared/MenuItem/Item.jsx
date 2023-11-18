const Item = ({ item }) => {
    const { _id, image, name, recipe, price } = item;
    return (
        <div className="flex items-center gap-x-4">
            <div className="">
                <img src={image} style={{ borderRadius: '0 200px 200px 200px' }} alt="" className="w-[150px] object-cover" />
            </div>
            <div className="flex-1">
                <h1 className="text-xl font-semibold">{name}-----</h1>
                <p>{recipe}</p>
            </div>
            <div className="">
                <h4 className="text-[#D99904] font-semibold">${price}</h4>
            </div>
        </div>
    );
};

export default Item;