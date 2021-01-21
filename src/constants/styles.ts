export interface ITheme {
  headerHeight: number;
  logoWidth: number;
  primaryColor: string;
}

export interface IThemeProvider {
  theme: ITheme;
}

export const THEME = {
  headerHeight: 50,
  logoWidth: 60,
  primaryColor: '#fde61b',
}