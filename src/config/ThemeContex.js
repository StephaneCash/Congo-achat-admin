import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContexProvider = (props) => {

    const [theme, setTheme] = useState(true);
    const [donnee, setDonnee] = useState('Light theme');

    const toggleTheme = () => {
        setTheme(!theme);
        setDonnee('Dark Theme');
    };

    return (
        <>
            <ThemeContext.Provider value={{ theme, toggleTheme, donnee }}>
                {props.children}
            </ThemeContext.Provider>
        </>
    )
}

export default ThemeContexProvider;