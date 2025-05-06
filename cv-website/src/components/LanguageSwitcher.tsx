import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Props for the LanguageSwitcher component, if any are needed in the future
interface LanguageSwitcherProps {
  isMobile?: boolean; // Optional prop to adjust styling for mobile menu
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isMobile }) => {
  const { i18n, t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language.split("-")[0]; // Get 'en' from 'en-US'

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languageOptions = [
    { code: "en", label: t("languageSwitcher.english"), flag: "🇬🇧" },
    { code: "fr", label: t("languageSwitcher.french"), flag: "🇫🇷" },
  ];

  const selectedLanguage =
    languageOptions.find((lang) => lang.code === currentLanguage) ||
    languageOptions[0];

  return (
    <div className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center p-2 rounded-md hover:bg-gray-200 transition-colors duration-300 ${
          isMobile ? "w-full justify-start" : ""
        }`}
        aria-label={t("languageSwitcher.ariaLabel")}
      >
        <span className="text-xl">{selectedLanguage.flag}</span>
        {isMobile && (
          <span className="ml-2 text-gray-800">{selectedLanguage.label}</span>
        )}
      </button>
      {dropdownOpen && (
        <div
          className={`absolute ${
            isMobile ? "left-0 top-full mt-1" : "right-0 mt-2"
          } w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50`}
        >
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="text-xl mr-2">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
