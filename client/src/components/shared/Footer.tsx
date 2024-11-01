import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-32 py-6 border-t px-4 xl:px-0 ">
      <div className="max-w-[1200px] flex flex-col sm:flex-row gap-4 justify-between items-center  mx-auto">
        <div className="uppercase text-primary">
          <Link
            to={"/"}
            className="text-2xl font-extrabold font-sans leading-none"
          >
            Regalo
          </Link>
          <p className="tracking-[3.7px] text-xs">Gift Shop</p>
        </div>

        <p className="text-sm">
          Copyright © 2024 Gift Shop | Powered by Davit Malutashvili
        </p>
      </div>
    </footer>
  );
};

export default Footer;
