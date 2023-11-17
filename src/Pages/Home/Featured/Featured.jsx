import featured from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Featured = () => {
    return (
        <div className="container mx-auto my-12">
            <div className="hero" style={{ backgroundImage: `url(${featured})`, backgroundAttachment: 'fixed' }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div>
                    <SectionTitle heading={"Featured Item"} subHeading={"Check it out"} isWhite={true}></SectionTitle>
                    <div className='flex gap-4 items-center justify-center my-16 mx-24'>
                        <div className='flex-1'>
                            <img src={featured} alt="" />
                        </div>
                        <div className='text-white flex-1 space-y-2'>
                            <p>March 20, 2023</p>
                            <h1 className='uppercase'>Where can I get some?</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum iusto soluta eveniet, sapiente odit dolorum quo aperiam quidem natus vitae?</p>
                            <button className='btn btn-outline text-white border-0 border-b-2 border-b-white'>Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;