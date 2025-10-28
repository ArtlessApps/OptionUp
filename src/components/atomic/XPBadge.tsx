import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface XPBadgeProps {
  amount: number;
  animate?: boolean;
}

export function XPBadge({ amount, animate = false }: XPBadgeProps) {
  return (
    <motion.div
      initial={animate ? { scale: 0, rotate: -180 } : false}
      animate={animate ? { scale: 1, rotate: 0 } : false}
      transition={{ type: 'spring', duration: 0.6 }}
      className="inline-flex items-center gap-1 bg-warning text-white px-3 py-1 rounded-full font-bold text-sm"
    >
      <span className="text-lg">⭐</span>
      {animate ? (
        <CountUp end={amount} duration={1} />
      ) : (
        <span>{amount}</span>
      )}
      <span className="text-xs">XP</span>
    </motion.div>
  );
}
