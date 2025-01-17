import { createContext, useContext, useState } from "react";

type Themes = "light" | "dark";

interface ContextType {
  theme: Themes;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ContextType | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Themes>("light");

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const value = useContext(ThemeContext);
  if (value === null)
    throw new Error("useTheme can only be used within ThemeProvider wrapper");

  return value;
}

export { ThemeProvider, useTheme };
