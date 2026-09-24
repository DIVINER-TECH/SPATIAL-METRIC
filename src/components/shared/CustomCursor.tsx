import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });

      const target = event.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, [role='button'], input, textarea, select");
      setIsHovering(interactive);
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
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-primary/10"
          style={{
            width: isHovering ? 28 : 16,
            height: isHovering ? 28 : 16,
            left: 0,
            top: 0,
          }}
        />
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 bg-primary"
          style={{
            width: 2,
            height: isHovering ? 18 : 12,
            left: 0,
            top: 0,
          }}
        />
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 bg-primary"
          style={{
            width: isHovering ? 18 : 12,
            height: 2,
            left: 0,
            top: 0,
          }}
        />
      </div>
    </div>
  );
};
