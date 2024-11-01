import { FaQuoteRight } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";

const TestimonialSlide = ({
  text,
  rating,
  author,
}: {
  text: string;
  rating: number;
  author: string;
}) => {
  return (
    <div className="flex flex-col items-center mx-auto gap-4 max-w-xl pb-10 px-4">
      <FaQuoteRight className="text-5xl" />
      <p className="text-center tracking-wide">{text}</p>

      <div className="flex text-secondary gap-1">
        {[...Array(rating)].map((_, i) => (
          <GoStarFill key={i} />
        ))}
        {[...Array(5 - rating)].map((_, i) => (
          <GoStarFill className="opacity-40" key={i} />
        ))}
      </div>

      <p className="font-medium">{author}</p>
    </div>
  );
};

export default TestimonialSlide;
