import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/modal/Modal";

const LanguageSelection = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectLanguage, setSelectLanguage] = useState("en");

  const handleNext = () => {
    i18n.changeLanguage(selectLanguage);
    navigate("/signup");
  };

  const languages = [
    { label: "English", value: "en" },
    { label: "German", value: "de" },
    { label: "Korean", value: "ko" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "Italian", value: "italian" },
    { label: "Portuguese", value: "portuguese" },
    { label: "Japanese", value: "japanese" },
    { label: "Chinese", value: "chinese" },
    { label: "Arabic", value: "arabic" },
    { label: "Russian", value: "russian" },
  ];

  return (
    <Modal>
      <p className="text-xl font-medium my-10 text-center text-white capitalize">
        Choose Language
      </p>

      <section className="max-h-80 overflow-auto">
        {languages.map(({ value, label }, ind) => (
          <div
            className="flex items-center justify-between mb-4 mx-10"
            key={ind}
          >
            <label htmlFor={value} className="ml-2 text-lg text-gray-300">
              {label}
            </label>
            <input
              defaultChecked={ind === 0}
              id={value}
              type="radio"
              value={value}
              name="language"
              onClick={() => setSelectLanguage(value)}
              className="w-4 cursor-pointer h-4 text-purple-500 bg-gray-100 border-gray-300  dark:focus:ring-purple-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        ))}
      </section>

      <div className="text-center my-10">
        <Button
          icon={""}
          className="w-56 bg-purple-500 text-center text-white"
          onClick={() => handleNext()}
        >
          Next
        </Button>
      </div>
    </Modal>
  );
};

export default LanguageSelection;
