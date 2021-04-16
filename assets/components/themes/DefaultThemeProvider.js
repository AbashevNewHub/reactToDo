import React from 'react';
import {createMuiTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import {amber, indigo} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        secondary: {
            main: amber['800'],
        }
    }
});
const responsiveTheme = responsiveFontSizes(theme);

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={responsiveTheme}>
            <CssBaseline/>
            {props.children}
        </MuiThemeProvider>
    );
};

export default DefaultThemeProvider;