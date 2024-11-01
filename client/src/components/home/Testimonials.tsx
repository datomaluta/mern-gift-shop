import Slider from "react-slick";
import AnimatedDivForLanding from "../shared/AnimatedDivForLanding";
import TestimonialSlide from "../testimonials/TestimonialSlide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../../style/testimonial.css";

export function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`} // Add a custom class
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
  };
  return (
    <AnimatedDivForLanding>
      <div className="px-6 md:px-8">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h1 className="text-3xl font-bold tracking-wide">Testimonials</h1>
          <span className="bg-secondary w-10 h-[6px]"></span>
        </div>
        <div className="mt-10 slider-container">
          <Slider {...settings}>
            <TestimonialSlide
              author="John Doe"
              text={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias illum non pariatur totam nihil, consequuntur aperiam provident aut cupiditate hic harum vero ratione est amet quo reprehenderit doloremque rem!"
              }
              rating={3}
            />
            <TestimonialSlide
              author="Leo Messi"
              text={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias illum non pariatur totam nihil, consequuntur aperiam provident aut cupiditate hic harum vero ratione est amet quo reprehenderit doloremque rem!"
              }
              rating={5}
            />
            <TestimonialSlide
              author="Cristiano Ronaldo"
              text={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias illum non pariatur totam nihil, consequuntur aperiam provident aut cupiditate hic harum vero ratione est amet quo reprehenderit doloremque rem!"
              }
              rating={4}
            />
          </Slider>
        </div>
      </div>
    </AnimatedDivForLanding>
  );
};

export default Testimonials;
