export interface ITheme {
  headerHeight: number;
  logoWidth: number;
  menuWidth: number;
  primaryColor: string;
}

export interface IThemeProvider {
  theme: ITheme;
}

export const THEME = {
  headerHeight: 50,
  logoWidth: 51,
  menuWidth: 200,
  primaryColor: '#fde61b',
}