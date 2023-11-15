import logo from '../../../assets/logo.png';
const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className="p-10 bg-base-200">
            <footer className="footer text-base-content">
                <aside>
                    <img src={logo} alt="" className='w-[100px]' />
                    <p>Bistro Boss Restaurant <br />Providing reliable food since 1992</p>
                </aside>
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <p className="text-center mt-6">Copyright © {year} || All Right Reserved || Bistro-Boss</p>
        </div>
    );
};

export default Footer;