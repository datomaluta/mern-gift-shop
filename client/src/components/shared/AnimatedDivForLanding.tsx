import React from "react";
import { motion } from "framer-motion";

const AnimatedDivForLanding = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="mt-32"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 150 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDivForLanding;
