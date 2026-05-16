import { useEffect, useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  // Load saved settings
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");

    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save notification setting
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Save dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.style.background = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.background = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);

  return (
    <div>
      <h1>Settings Page</h1>

      <div>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>
      </div>

      <br />

      <div>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Dark Mode
        </label>
      </div>
    </div>
  );
};

export default Settings;
