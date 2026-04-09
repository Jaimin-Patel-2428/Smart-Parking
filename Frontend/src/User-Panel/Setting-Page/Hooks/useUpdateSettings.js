import { useRef, useState } from "react";
import { updateSettings } from "../Services/settingsService";
import { normalizeSettings } from "../Services/settingsService";

const useUpdateSettings = (setSettings) => {
  const requestVersionRef = useRef(0);
  const [savingSection, setSavingSection] = useState(null);

  const handleUpdate = async (section, updatedData) => {
    const requestVersion = requestVersionRef.current + 1;
    requestVersionRef.current = requestVersion;

    let previousSettingsSnapshot;

    setSettings((currentSettings) => {
      previousSettingsSnapshot = currentSettings;

      return normalizeSettings({
        ...currentSettings,
        [section]: {
          ...(currentSettings?.[section] || {}),
          ...updatedData,
        },
      });
    });

    setSavingSection(section);

    try {
      const payload = {
        [section]: updatedData,
      };

      const response = await updateSettings(payload);

      if (requestVersion === requestVersionRef.current) {
        setSettings(normalizeSettings(response?.settings || response));
      }

      return { success: true, settings: response?.settings || response };
    } catch (error) {
      if (requestVersion === requestVersionRef.current && previousSettingsSnapshot) {
        setSettings(previousSettingsSnapshot);
      }

      console.error("Error updating settings:", error);
      throw error;
    } finally {
      if (requestVersion === requestVersionRef.current) {
        setSavingSection(null);
      }
    }
  };

  return { handleUpdate, savingSection };
};

export default useUpdateSettings;
