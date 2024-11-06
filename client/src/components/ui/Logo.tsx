import { Link } from "react-router-dom";

const Logo = ({ white = false }: { white?: boolean }) => {
  return (
    <div className={`uppercase  ${white ? "text-white" : "text-primary"}`}>
      <Link to={"/"} className="text-2xl font-extrabold font-sans leading-none">
        Regalo
      </Link>
      <p className="tracking-[3.7px] text-xs">Gift Shop</p>
    </div>
  );
};

export default Logo;
