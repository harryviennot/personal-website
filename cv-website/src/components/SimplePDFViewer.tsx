import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

interface SimplePDFViewerProps {
  pdfFile: string;
  title: string;
}

const SimplePDFViewer: React.FC<SimplePDFViewerProps> = ({
  pdfFile,
  title,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [useObjectTag, setUseObjectTag] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if screen is mobile sized
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
      document.body.style.overflow = "";

      // Reset any meta viewport changes
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          "content",
          "width=device-width, initial-scale=1"
        );
      }
    };
  }, []);

  useEffect(() => {
    // Handle fullscreen mode on mobile
    if (isFullscreen && isMobile) {
      // Update viewport meta tag to prevent zooming issues on mobile
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        );
      }

      // Prevent body scrolling but allow iframe/object scrolling
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.top = "0";
      document.body.style.left = "0";

      // Ensure the PDF container takes full viewport height
      if (pdfContainerRef.current) {
        pdfContainerRef.current.style.height = "100%";
        pdfContainerRef.current.style.maxHeight = "none";
      }
    } else {
      // Reset viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          "content",
          "width=device-width, initial-scale=1"
        );
      }

      // Reset body styles
      document.body.style.overflow = isFullscreen ? "hidden" : "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.top = "";
      document.body.style.left = "";

      // Reset container height
      if (pdfContainerRef.current) {
        pdfContainerRef.current.style.height = "";
        pdfContainerRef.current.style.maxHeight = "";
      }
    }
  }, [isFullscreen, isMobile]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Entering fullscreen
      scrollPositionRef.current = window.scrollY;
      setIsFullscreen(true);
    } else {
      // Directly exit fullscreen without animation delay
      document.body.style.overflow = "";
      document.body.style.position = "";
      setIsFullscreen(false);

      // Restore scroll position after exiting fullscreen
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 50);
    }
  };

  const switchToObjectTag = () => {
    setUseObjectTag(true);
  };

  // Get Google PDF Viewer URL for mobile
  const getGoogleViewerUrl = (pdfUrl: string) => {
    // Use absolute URL for Google Viewer
    const absoluteUrl = pdfUrl.startsWith("http")
      ? pdfUrl
      : window.location.origin +
        (pdfUrl.startsWith("/") ? pdfUrl : "/" + pdfUrl);

    return `https://docs.google.com/viewer?url=${encodeURIComponent(
      absoluteUrl
    )}&embedded=true`;
  };

  const renderPDFView = () => {
    if (useObjectTag) {
      // Object tag view
      return (
        <object
          data={pdfFile}
          type="application/pdf"
          className={`w-full ${
            isFullscreen
              ? isMobile
                ? "h-[calc(100vh-60px)]"
                : "h-[calc(100vh-70px)]"
              : isMobile
              ? "h-[500px]"
              : "h-[850px]"
          }`}
        >
          <div className="flex items-center justify-center h-full bg-gray-100 p-4 md:p-8 text-center">
            <div className="w-full max-w-md bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="text-red-500 mb-3">
                <svg
                  className="w-8 h-8 md:w-12 md:h-12 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-red-600 font-medium mb-4 text-base md:text-lg">
                Votre navigateur ne peut pas afficher ce PDF
              </p>
              <a
                href={pdfFile}
                download
                className="inline-flex items-center bg-blue-600 text-white py-1.5 md:py-2 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm text-sm md:text-base"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Télécharger le PDF
              </a>
            </div>
          </div>
        </object>
      );
    } else if (isMobile) {
      // Use Google PDF Viewer for mobile devices for better scrolling
      return (
        <motion.iframe
          layoutId="pdf-iframe-mobile"
          src={getGoogleViewerUrl(pdfFile)}
          title={title}
          className={`w-full ${
            isFullscreen ? "h-[calc(100vh-60px)]" : "h-[500px]"
          } border-none`}
          sandbox="allow-scripts allow-same-origin allow-popups"
          loading="lazy"
        />
      );
    } else {
      // Iframe for desktop
      return (
        <motion.iframe
          layoutId="pdf-iframe"
          src={pdfFile}
          title={title}
          className={`w-full ${
            isFullscreen ? "h-[calc(100vh-70px)]" : "h-[850px]"
          } border-none`}
          loading="lazy"
        />
      );
    }
  };

  return (
    <LayoutGroup>
      <div
        ref={viewerRef}
        className={`${
          isFullscreen
            ? "fixed inset-0 z-50 bg-gray-900 flex flex-col"
            : "flex flex-col items-center w-full"
        }`}
      >
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              className="absolute top-4 right-4 z-[60]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={toggleFullscreen}
                className="bg-gray-800 text-white p-2 md:p-2.5 rounded-full hover:bg-gray-700 transition-colors shadow-lg"
                title="Quitter le mode plein écran"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFullscreen && (
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl md:text-2xl font-bold text-white text-center py-3 md:py-4 truncate px-4"
            >
              {title}
            </motion.h2>
          )}
        </AnimatePresence>

        <motion.div
          layoutId="pdf-container"
          ref={pdfContainerRef}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 180,
            duration: 0.5,
          }}
          className={`${
            isFullscreen
              ? "flex-1 w-full max-h-[calc(100vh-70px)]"
              : "w-full max-w-full bg-white border border-gray-200"
          } rounded-xl shadow-lg overflow-hidden`}
        >
          {/* Toolbar header */}
          <AnimatePresence mode="sync">
            {!isFullscreen ? (
              <motion.div
                layoutId="toolbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 md:p-3 flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-200"
              >
                <motion.span
                  layoutId="title-text"
                  className="font-medium text-gray-700 pl-2 truncate w-full md:max-w-sm mb-2 md:mb-0"
                >
                  {title}
                </motion.span>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-end px-2">
                  {!useObjectTag && (
                    <button
                      onClick={switchToObjectTag}
                      className="inline-flex items-center bg-blue-600 text-white py-1.5 px-2 md:px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-300 shadow-sm"
                      title="Changer le mode d'affichage si le PDF ne se charge pas correctement"
                    >
                      <svg
                        className="w-4 h-4 mr-1 md:mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span className="md:inline">Mode alternatif</span>
                    </button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFullscreen}
                    className="inline-flex items-center bg-gray-700 text-white py-1.5 px-2 md:px-3 rounded-lg text-sm hover:bg-gray-800 transition-colors duration-300 shadow-sm"
                    title="Mode plein écran"
                  >
                    <svg
                      className="w-4 h-4 mr-1 md:mr-1.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="md:inline">Plein écran</span>
                  </motion.button>
                  <a
                    href={pdfFile}
                    download
                    className="inline-flex items-center bg-green-600 text-white py-1.5 px-2 md:px-3 rounded-lg text-sm hover:bg-green-700 transition-colors duration-300 shadow-sm"
                    title="Télécharger le PDF"
                  >
                    <svg
                      className="w-4 h-4 mr-1 md:mr-1.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="md:inline">Télécharger</span>
                  </a>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* PDF content */}
          <motion.div
            layoutId="pdf-content-area"
            className={`${isFullscreen ? "h-full" : "p-1 bg-gray-50"} ${
              isFullscreen && isMobile ? "overflow-y-auto" : ""
            }`}
          >
            {renderPDFView()}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {!isFullscreen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2 }}
              className="mt-4 md:mt-6 text-center text-gray-500 text-xs md:text-sm bg-blue-50 p-2 md:p-3 rounded-lg border border-blue-100 inline-block max-w-xl"
            >
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-1.5 md:mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-left">
                  Si le document ne s'affiche pas correctement, essayez le mode
                  alternatif ou téléchargez-le.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};

export default SimplePDFViewer;
