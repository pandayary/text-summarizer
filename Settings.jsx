import { useState } from "react";

function Settings() {

  const [darkMode, setDarkMode] =
    useState(true);

  const toggleTheme = () => {

    setDarkMode(!darkMode);

    document.body.classList.toggle(
      "light-theme"
    );
  };

  return (
    <div>

      <h1>Settings</h1>

      <div className="setting-card">

        <h3>Theme</h3>

        <button
          onClick={toggleTheme}
        >
          {darkMode
            ? "Light Mode"
            : "Dark Mode"}
        </button>

      </div>

    </div>
  );
}

export default Settings;