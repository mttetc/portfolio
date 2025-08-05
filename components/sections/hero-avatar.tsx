import * as motion from 'motion/react-client';
import Image from 'next/image';
import { FIRST_NAME } from '@/constants/names';
import avatarImage from '@/public/images/avatar.png';

const getImageVariants = () => ({
  hidden: {
    opacity: 0,
    scale: 0.9,
    x: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  },
});

export function HeroAvatar() {
  return (
    <motion.div
      variants={getImageVariants()}
      initial="visible"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px]">
        <div className="absolute inset-0 bg-primary/20 rounded-full overflow-hidden border-4 border-primary">
          <Image
            src={avatarImage}
            alt={`${FIRST_NAME}'s portrait`}
            width={180}
            height={180}
            className="object-cover rounded-full w-full h-full"
            priority
            sizes="(max-width: 768px) 120px, (max-width: 1200px) 150px, 180px"
          />
        </div>
      </div>
    </motion.div>
  );
}
