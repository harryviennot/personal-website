import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ExtraItemProps {
  title: string;
  category: string;
  description: string;
}

const ExtraItem: React.FC<ExtraItemProps> = ({
  title,
  category,
  description,
}) => {
  return (
    <div className="flex items-start">
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
        {category}
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-medium text-gray-900">{title}</h4>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const ExtrasSection: React.FC = () => {
  const { t } = useTranslation();

  const extraSlugs = ["languages", "certification", "volunteer"];
  const extras = extraSlugs.map((slug) => ({
    title: t(`extras.${slug}.title`),
    category: t(`extras.${slug}.category`),
    description: t(`extras.${slug}.description`),
  }));

  return (
    <section id="extras" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t("extras.title")}
          </h2>

          <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-sm">
            <div className="space-y-6">
              {extras.map((extra, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ExtraItem
                    title={extra.title}
                    category={extra.category}
                    description={extra.description}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExtrasSection;
