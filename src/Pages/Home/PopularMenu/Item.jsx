const Item = ({ item }) => {
    const { _id, image, name, recipe, price } = item;
    return (
        <div className="flex items-center gap-x-4">
            <div>
                <img src={image} style={{borderRadius: '0 200px 200px 200px'}} alt="" className="w-[150px] object-cover" />
            </div>
            <div>
                <h1 className="text-xl font-semibold">{name}-----</h1>
                <p>{recipe}</p>
            </div>
            <h4 className="text-[#D99904] font-semibold">${price}</h4>
        </div>
    );
};

export default Item;