import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: { min: 150, max: 400, default: 150 },
  title: {min: 400, max: 900, default: 400 },
}

type FontType = keyof typeof FONT_WEIGHTS;

const renderText = (text : string, className : string, baseWeight : number) => {
  return [... text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}`}}
    >
      {char === " " ? '\u00A0' : char}
    </span>
  ));
}

const setupTextHover = (container: HTMLElement | null, type: FontType) => {
  if (!container) return;

  const letters = container.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration: number = 0.25
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const center = l - left + w / 2;
      const distance = Math.abs(mouseX - center);
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  }

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  }
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanup?.();
      subtitleCleanup?.();
    }
  }, [])

  return (
    <section id="welcome">
        <p ref={subtitleRef}>
          {renderText(
            "Hey, I'm Ryan! Welcome to my",
            "text-3xl font-georama",
            150,
          )}
        </p>
        <h1 ref={titleRef} className="mt-7">
          {renderText(
            "macfolio",
            "text-9xl font-georama italic",
            400,
          )}
        </h1>

        <div className="small-screen">
            <p>This Portfolio is designed for desktop/tablet screens only</p>
        </div>
    </section>
  )
}

export default Welcome