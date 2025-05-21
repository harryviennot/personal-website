import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ExperienceCardProps {
  title: string;
  company: string;
  slug: string;
  date: string;
  description: string;
  isExtra?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  slug,
  date,
  description,
  isExtra = false,
}) => {
  const { t } = useTranslation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // For mouse tracking tilt effect
  const [mouseOver, setMouseOver] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to rotation values with smoother transitions
  const rotateX = useTransform(mouseY, [-100, 100], [3, -3]);
  const rotateY = useTransform(mouseX, [-100, 100], [-3, 3]);

  // Add shadow motion value for smooth transitions
  const shadowBlur = useMotionValue("0 4px 6px rgba(0,0,0,0.05)");

  // Handle mouse move for tilt effect with smoothing
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !mouseOver) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to card center (from -1 to 1)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Convert to values between -100 and 100 for rotation with damping
    const xValue = ((e.clientX - centerX) / (rect.width / 2)) * 100;
    const yValue = ((e.clientY - centerY) / (rect.height / 2)) * 100;

    // Use spring-like effect by slowly moving towards target value
    mouseX.set(xValue);
    mouseY.set(yValue);
  };

  // Handle mouse enter/leave for smooth shadow transition
  const handleMouseEnter = () => {
    setMouseOver(true);
    // Animate shadow gradually
    const shadowAnimation = [
      "0 4px 6px rgba(0,0,0,0.05)",
      "0 6px 10px rgba(0,0,0,0.06)",
      "0 8px 15px rgba(0,0,0,0.07)",
      "0 10px 20px rgba(0,0,0,0.08)",
    ];

    let step = 0;
    const shadowInterval = setInterval(() => {
      if (step < shadowAnimation.length) {
        shadowBlur.set(shadowAnimation[step]);
        step++;
      } else {
        clearInterval(shadowInterval);
      }
    }, 30); // 30ms between steps for a ~90ms transition
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
    // Animate shadow gradually back
    const shadowAnimation = [
      "0 8px 15px rgba(0,0,0,0.07)",
      "0 6px 10px rgba(0,0,0,0.06)",
      "0 4px 6px rgba(0,0,0,0.05)",
      "0 2px 4px rgba(0,0,0,0.05)",
    ];

    let step = 0;
    const shadowInterval = setInterval(() => {
      if (step < shadowAnimation.length) {
        shadowBlur.set(shadowAnimation[step]);
        step++;
      } else {
        clearInterval(shadowInterval);
      }
    }, 30);
  };

  // Create truly continuous flowing animation
  useEffect(() => {
    // Even slower movement for more subtlety
    const xFactor = Math.random() * 0.02 + 0.01; // 0.01-0.03 (extremely slow)
    const yFactor = Math.random() * 0.02 + 0.01; // 0.01-0.03 (extremely slow)
    const timeOffset = Math.random() * 20; // Larger range for more variety

    // Track previous values for smoothing
    let prevX = 0;
    let prevY = 0;

    // Continuous animation frame loop
    let animationFrame: number;
    let time = timeOffset;

    const animateFlow = () => {
      // Use sine and cosine waves with different frequencies
      const targetX = Math.sin(time * xFactor) * 8; // Reduced amplitude
      const targetY = Math.cos(time * yFactor + 2) * 8; // Reduced amplitude

      // Smooth interpolation between current and target positions
      const smoothingFactor = 0.03; // Lower = smoother but slower response (0.01-0.1)

      // Calculate new position with smoothing (interpolation)
      const newX = prevX + (targetX - prevX) * smoothingFactor;
      const newY = prevY + (targetY - prevY) * smoothingFactor;

      // Update previous values for next frame
      prevX = newX;
      prevY = newY;

      // Only animate if not being hovered
      if (!mouseOver) {
        // Smoothly update motion values
        x.set(newX);
        y.set(newY);
      }

      // Tiny time increment for ultra-smooth motion
      time += 0.01;

      // Continue the animation loop
      animationFrame = requestAnimationFrame(animateFlow);
    };

    // Start the animation
    animateFlow();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [x, y, mouseOver]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{
        x,
        y,
        rotateX: mouseOver ? rotateX : 0,
        rotateY: mouseOver ? rotateY : 0,
        transformPerspective: 1500,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease-out",
        boxShadow: shadowBlur, // Use the motion value for shadow
      }}
      whileHover={{
        scale: 1.01,
        z: 2,
        // Remove boxShadow from here since we're handling it separately
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 25,
          mass: 1.5,
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={`p-6 rounded-xl ${
        isExtra ? "bg-blue-50 border border-blue-100" : "bg-white"
      } transition-all duration-300`}
    >
      <Link
        to={
          slug === "airbusHackathon"
            ? `/hackathons/airbus`
            : `/experience/${slug}`
        }
      >
        <div className="transform-gpu">
          {" "}
          {/* Ensure GPU acceleration for smoother animation */}
          <h3 className="text-xl font-semibold text-gray-900">
            {title} – {company}
          </h3>
          <p className="text-gray-500 mb-3">{date}</p>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
            {t("experience.readMore")}
            <svg
              className="ml-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  const experienceSlugs = ["bpce", "strategin", "airbusHackathon"];
  const experiences = experienceSlugs.map((slug) => ({
    slug: slug,
    title: t(`experience.${slug}.title`),
    company: t(`experience.${slug}.company`),
    date: t(`experience.${slug}.date`),
    description: t(`experience.${slug}.description`),
    isExtra: slug === "airbusHackathon",
  }));

  return (
    <section id="experience" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t("experience.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                title={exp.title}
                company={exp.company}
                slug={exp.slug}
                date={exp.date}
                description={exp.description}
                isExtra={exp.isExtra}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
