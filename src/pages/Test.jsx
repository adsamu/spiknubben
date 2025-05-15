import { useEffect, useRef, useState, useMemo } from "react";
import { interpolate } from "flubber";

import { Card } from "@/components/ui";
import { AnimatedPage } from "@/animation";

const pathA1 =
  "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z";

const pathA2 =
  "M1200 0V46.29c-47.79 22.2-103.59 32.17-158 28-70.36-5.37-136.33-33.31-206.8-37.5C761.36 32.43 687.66 53.67 617 72.05c-69.27 18-138.3 24.88-209.4 13.08-36.15-6-69.85-17.84-104.45-29.34C210.51 25 87-14.29 0 52.47V0Z";

const pathB1 = "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z";

const pathB2 = "M1200,0V15.81C1187,36.92,1172.36,56.86,1152.31,72.05,1100.59,111.27,1035,111,975.42,91.58c-31.15-10.15-60.09-26.07-89.67-39.8-40.92-19-84.73-46-130.83-49.67-36.26-2.85-70.9,9.42-98.6,31.56-31.77,25.39-62.32,62-103.63,73-40.44,10.79-81.35-6.69-119.13-24.28s-75.16-39-116.92-43.05c-59.73-5.85-113.28,22.88-168.9,38.84-30.2,8.66-59,6.17-87.09-7.5-22.43-10.89-48-26.93-60.65-49.24V0Z";


const pathC1 = "M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z";

const pathC2 = "M1200,0V5.63C1050.07,59,885.91,71.32,724.17,42.57c-43,-7.64,-84.23,-20.12,-127.61,-26.46,-59,-8.63,-112.48,12.24,-165.56,35.4C372.07,77.22,314,95.24,248.8,90c-86.53,-7,-172.46,-45.71,-248.8,-84.81V0Z";



export default function Test() {
  const refA = useRef(null);
  const refB = useRef(null);
  const refC = useRef(null);
  const [forward, setForward] = useState(true);

  // ✅ Memoize interpolator to avoid recalculation
  const interpolatorA = useMemo(() => interpolate(pathA1, pathA2), []);
  const interpolatorB = useMemo(() => interpolate(pathB2, pathB1), []);
  const interpolatorC = useMemo(() => interpolate(pathC1, pathC2), []);

  useEffect(() => {
    if (!refA.current) return;
    if (!refB.current) return;
    if (!refC.current) return;

    let frame;
    let start = null;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      const t = Math.min(progress, 1);
      const eased = forward ? t : 1 - t;

      const dA = interpolatorA(eased);
      refA.current.setAttribute("d", dA);

      const dB = interpolatorB(eased);
      refB.current.setAttribute("d", dB);

      const dC = interpolatorC(eased);
      refC.current.setAttribute("d", dC);

      if (t < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        // Flip direction and restart
        setForward((prev) => !prev);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [forward, interpolatorA, interpolatorB, interpolatorC]);

  return (
    <AnimatedPage className="w-full max-w-md mx-auto">
      <Card>
        <div className="flex-none bg-primary w-full">
          <svg
            className="fill-secondary rotate-180 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path ref={refA} d={pathA1} opacity=".25" />
            <path ref={refB} d={pathB2} opacity=".5" />
            <path ref={refC} d={pathC1} opacity="1" />
          </svg>
        </div>
      </Card>
    </AnimatedPage>
  );
}


// <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" ></path>
//
// <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" ></path>
//



// <path d="M1200 0V46.29c-47.79 22.2-103.59 32.17-158 28-70.36-5.37-136.33-33.31-206.8-37.5C761.36 32.43 687.66 53.67 617 72.05c-69.27 18-138.3 24.88-209.4 13.08-36.15-6-69.85-17.84-104.45-29.34C210.51 25 87-14.29 0 52.47V0Z" opacity=".25" ></path>
//
// <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" ></path>
//
// <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" ></path>

