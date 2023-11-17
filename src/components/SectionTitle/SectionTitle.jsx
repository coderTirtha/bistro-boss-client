const SectionTitle = ({ heading, subHeading, isWhite }) => {
    return (
        <div className='max-w-md mx-auto my-8'>
            <h3 className='text-[#D99904] text-center text-xl italic border-b-2 border-b-gray-200 py-4'>-- {subHeading} --</h3>
            <h1 className={`text-center ${isWhite ? 'text-white' : ''} uppercase text-4xl font-semibold border-b-2 border-b-gray-200 py-4`}>{heading}</h1>
        </div>
    );
};

export default SectionTitle;