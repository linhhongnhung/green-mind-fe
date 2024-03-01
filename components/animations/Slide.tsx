"use client";
import { motion, useInView } from "framer-motion";
import { useRef, FC, ReactNode } from "react";

interface Props {
  key: number;
  children: ReactNode;
  index: number;
  direction: string;
}

const Slide: FC<Props> = ({ children, index, direction }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  let axis;
  let startLocation;
  switch (direction) {
    case "up":
      axis = "y";
      startLocation = 200;
      break;
    case "down":
      axis = "y";
      startLocation = -10;
      break;
    case "left":
      axis = "x";
      startLocation = 300;
      break;
    case "right":
      axis = "x";
      startLocation = -300;
      break;
    default:
      axis = "y";
      startLocation = 0;
  }

  let slideUpVariants = {
    hidden: { opacity: 0, [axis]: `${startLocation}px` },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: { delay: 0.2 * index, duration: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideUpVariants}
      className="box"
    >
      {children}
    </motion.div>
  );
};

export default Slide;
