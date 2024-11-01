import { motion } from "framer-motion";
import heroImg from "./../../assets/images/hero-shop.webp";

const container = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: delay,
      duration: 0.5,
    },
  },
});

const Hero = () => {
  return (
    <div className="flex gap-14 lg:gap-10 items-start lg:pt-32 pt-12 flex-col lg:flex-row h-auto lg:h-[80vh] overflow-hidden">
      <div className="lg:w-[40%] w-full text-center lg:text-left">
        <motion.h1
          variants={container(0)}
          initial="hidden"
          animate="visible"
          className="text-3xl lg:text-5xl tracking-normal leading-[50px] lg:leading-[70px] text-primary font-bold"
        >
          The Best Way to Make Someone Happy...
        </motion.h1>
        <motion.p
          variants={container(0.5)}
          initial="hidden"
          animate="visible"
          className="tracking-wide text-sm leading-[30px] mt-7 lg:mt-10"
        >
          We know that finding the perfect gift is not an easy task. But, with
          Regalo, you can find the best gift ideas for your loved ones.
        </motion.p>
        <motion.button
          variants={container(1)}
          initial="hidden"
          animate="visible"
          className="bg-primary text-white px-4 py-2 rounded mt-10"
        >
          Choose Your Box
        </motion.button>
      </div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="lg:w-[60%] w-full "
      >
        <img src={heroImg} alt="hero" className="h-" />
      </motion.div>
    </div>
  );
};

export default Hero;
