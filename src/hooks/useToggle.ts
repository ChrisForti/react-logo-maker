import { useState } from "react";
import type React from "react";

// Custom hook for toggle functionality
export function useToggle(initialValue: boolean = true) {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => setValue((prev) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
}

// Multiple toggles hook for managing many toggles at once
export function useMultipleToggles(initialValues: Record<string, boolean>) {
  const [toggles, setToggles] =
    useState<Record<string, boolean>>(initialValues);

  const toggle = (key: string) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const setToggle = (
    key: string,
    value: boolean | React.SetStateAction<boolean>,
  ) => {
    setToggles((prev) => ({
      ...prev,
      [key]: typeof value === "function" ? value(prev[key]) : value,
    }));
  };

  const toggleAll = (value: boolean) => {
    const newToggles = Object.keys(toggles).reduce(
      (acc, key) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setToggles(newToggles);
  };

  return {
    toggles,
    toggle,
    setToggle,
    toggleAll,
  };
}
