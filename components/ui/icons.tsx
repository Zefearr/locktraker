import arr from '@/img/arrow2.svg';
import Image from 'next/image';
export const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 16L6 10H18L12 16Z"></path>
  </svg>
);
export const StarIcon = ({ className = "w-6 h-6 text-amber-400" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

interface IconProps {
  className?: string;
}

interface IconProps {
  className?: string;
}

export const DeadlockArrowIcon = ({ className = "w-6 h-6 text-zinc-400" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 501 432"
    fill="currentColor" // Позволяет красить стрелку через text-... в Tailwind
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Сохраняем объединенные матрицы трансформации, чтобы стрелка оставалась по центру */}
    <g transform="matrix(1.087417, 0, 0, 1.087417, -28.854619, -183.02983)">
      <path
        d="M456.052,182.325
           C463.623,185.794 469.324,192.367 471.686,200.353
           C474.049,208.339 472.842,216.956 468.377,223.986
           C428.925,286.1 333.497,436.348 284.87,512.909
           C278.476,522.975 267.362,529.055 255.437,529.01
           C243.511,528.964 232.444,522.8 226.127,512.685
           C173.771,428.848 66.43,256.968 34.931,206.529
           C32.665,202.901 32.044,198.482 33.222,194.37
           C34.399,190.257 37.265,186.837 41.108,184.958
           C58.934,176.243 86.239,162.893 86.239,162.893
           C86.239,162.893 109.613,163.056 124.557,163.161
           C132.099,163.213 139.044,167.272 142.793,173.817
           C167.02,216.116 255.674,370.9 255.674,370.9
           C255.674,370.9 346.838,207.804 367.579,170.696
           C370.153,166.09 375.001,163.218 380.278,163.174
           C392.529,163.071 413.641,162.893 413.641,162.893
           C413.641,162.893 436.132,173.198 456.052,182.325Z"
      />
    </g>
  </svg>
);


