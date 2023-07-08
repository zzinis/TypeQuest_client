import { createTheme } from "@mui/material/styles";

const Muitheme = createTheme({
    palette: {
        primary: {
            main: "#161616"
        },
        secondary: {
            main: "#EEFD53"
        },
        error: {
            main: "#DA1E28"
        }
    },
    typography: {
        fontFamily: ["Noto Sans KR", "sans-serif", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"].join(","),
        body2: {
            fontSize: 20,
            fontWeight: bold,
        }
    }
});

export default Muitheme;