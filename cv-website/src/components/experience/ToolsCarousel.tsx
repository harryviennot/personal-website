import React, { useMemo } from "react";

interface ToolInfo {
  name: string;
  image_path: string;
}

interface ToolsCarouselProps {
  tools: ToolInfo[];
  shuffleArray: <T>(array: T[]) => T[];
}

const ToolsCarousel: React.FC<ToolsCarouselProps> = ({
  tools,
  shuffleArray,
}) => {
  // Memoize shuffled tools to prevent reshuffling on re-renders
  const shuffledTools = useMemo(() => {
    return shuffleArray(tools);
  }, [tools, shuffleArray]);

  const shuffledToolsRow2 = useMemo(() => {
    return shuffleArray(tools);
  }, [tools, shuffleArray]);

  if (tools.length === 0) return null;

  return (
    <div className="flex flex-col">
      {/* First row - moving left */}
      <div className="relative">
        {/* Left gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        {/* Right gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div className="overflow-hidden">
          <div
            className="flex space-x-6 py-4 animate-scroll-left"
            style={{
              width: "fit-content",
              animation: "scrollLeft 60s linear infinite",
            }}
          >
            {[...shuffledTools, ...shuffledTools, ...shuffledTools].map(
              (tool, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center space-y-3 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-32 h-32"
                >
                  <div className="w-16 h-16 min-w-[4rem] min-h-[4rem] flex items-center justify-center">
                    <img
                      src={tool.image_path}
                      alt={tool.name}
                      className="max-w-full max-h-full w-12 h-12 min-w-[3rem] min-h-[3rem] object-contain"
                      draggable="false"
                    />
                  </div>
                  <span className="text-gray-700 font-medium text-center text-sm">
                    {tool.name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Second row - moving right */}
      <div className="relative">
        {/* Left gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        {/* Right gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div className="overflow-hidden">
          <div
            className="flex space-x-6 py-4 animate-scroll-right"
            style={{
              width: "fit-content",
              animation: "scrollRight 60s linear infinite",
            }}
          >
            {[
              ...shuffledToolsRow2,
              ...shuffledToolsRow2,
              ...shuffledToolsRow2,
            ].map((tool, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center space-y-3 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-32 h-32"
              >
                <div className="w-16 h-16 min-w-[4rem] min-h-[4rem] flex items-center justify-center">
                  <img
                    src={tool.image_path}
                    alt={tool.name}
                    className="max-w-full max-h-full w-12 h-12 min-w-[3rem] min-h-[3rem] object-contain"
                    draggable="false"
                  />
                </div>
                <span className="text-gray-700 font-medium text-center text-sm">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          
          @keyframes scrollRight {
            0% { transform: translateX(calc(-100% / 3)); }
            100% { transform: translateX(0); }
          }
          
          .animate-scroll-left {
            animation: scrollLeft 60s linear infinite;
          }
          
          .animate-scroll-right {
            animation: scrollRight 60s linear infinite;
          }
        `,
        }}
      />
    </div>
  );
};

export default ToolsCarousel;
