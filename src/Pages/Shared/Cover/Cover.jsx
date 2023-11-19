import { Parallax } from 'react-parallax';

const Cover = ({ img, title, description }) => {
    return (
        <div>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={img}
                bgImageAlt="the menu"
                strength={-200}
            >
                <div className="hero py-32 px-24">
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-lg py-10 text-white">
                            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                            <p className="mb-5">{description}</p>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
};

export default Cover;