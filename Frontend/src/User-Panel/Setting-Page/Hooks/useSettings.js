import { useEffect, useState } from "react";
import { getSettings, normalizeSettings, defaultSettings } from "../Services/settingsService";

const useSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(normalizeSettings(data));
    } catch (error) {
      console.error("Error fetching settings:", error);
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, setSettings, loading, refetch: fetchSettings };
};

export default useSettings;
