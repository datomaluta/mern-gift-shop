import { motion } from "framer-motion";
import { IoCloseCircleSharp } from "react-icons/io5";

const ModalWrapper = ({
  children,
  setModalOpen,
}: {
  children?: React.ReactNode;
  setModalOpen: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="backdrop-blur-xs fixed left-0 top-0 z-[1000] h-screen w-full transition-all"
    >
      <div
        onClick={() => setModalOpen()}
        className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5`}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: "-150%", x: "-50%" }}
        animate={{
          opacity: 1,
          y: "-50%",
          x: "-50%",
        }}
        exit={{
          opacity: 0,
          y: "-150%",
        }}
        transition={{ duration: 0.3 }}
        className="max-w-xl fixed left-1/2 top-1/2 z-999999 max-h-[90vh] w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-white px-8 py-12 "
      >
        <button
          className="absolute right-2 top-2"
          onClick={() => setModalOpen()}
        >
          <IoCloseCircleSharp className="text-3xl" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ModalWrapper;
