import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export function createTheme() {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#80F',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fafafa',
      },
    },
  });
}
