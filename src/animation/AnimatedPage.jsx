import { motion } from "framer-motion";
import { animations } from "./animations"
import { useNavigationState } from "@/context/NavigationContext";

export default function AnimatedPage({ children, className = "" }) {
  const { cameFromInternal } = useNavigationState();

  const variantKey = cameFromInternal ? "rl" : "bl";
  const variants = animations[variantKey] || animations.fadeIn;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

