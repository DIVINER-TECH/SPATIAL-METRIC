import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible || isMobile) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: 0,
        height: 0,
      }}
    >
      <div className="relative h-0 w-0">
        <div className="absolute -left-[1px] -top-5 h-10 w-[2px] bg-white" />
        <div className="absolute -left-5 -top-[1px] h-[2px] w-10 bg-white" />
      </div>
    </div>
  );
};
