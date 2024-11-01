import { Link } from "react-router-dom";

const CategoryCard = ({
  title,
  image,
  color,
  href,
}: {
  title: string;
  image: string;
  color: string;
  href: string;
}) => {
  return (
    <Link to={href} className="max-w-[350px]">
      <img src={image} alt={title} />
      <div className={`${color} p-4`}>
        <p className="border-b-2 border-navy-blue pb-2 text-center uppercase text-sm">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
