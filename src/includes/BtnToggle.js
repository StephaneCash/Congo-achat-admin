import React, { useContext } from 'react';
import "../css/BtnToggle.css";
import { ThemeContext } from "../config/ThemeContex";
import { ToggleOff, ToggleOn } from '@material-ui/icons';

function BtnToggle() {

    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <div
            onClick={toggleTheme}
            className={theme ? 'btn-toggle goLight' : 'btn-toggle goDark'}
        >
            {theme ? <ToggleOn /> : <ToggleOff />}
        </div>
    )
}

export default BtnToggle