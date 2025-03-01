
import { createTheme } from '@mui/material/styles';


const fontcolorTheme = createTheme({
    palette:{
        greeen:{
            main: '#00B69B' //green
        },
        blue:{
            main:'#ffc700' //yellow
        },
        primary:{
            main:'#41424C'
        }
        
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'Roboto',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
        mono: "Menlo, monospace",
    },
});

export default fontcolorTheme;