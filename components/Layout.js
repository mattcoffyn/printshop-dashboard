import styled, { ThemeProvider } from 'styled-components';
import { Header } from './Header';
import { lightTheme, darkTheme } from './styles/ThemeConfig';
import { useDarkMode } from '../lib/useDarkMode';
import GlobalStyles from './styles/GlobalStyles';
import Typography from './styles/Typography';
import { SideNav } from './SideNav';

const InnerStyles = styled.main`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: var(--headerHeight) 2rem 0;
`;

export default function Layout({ children }) {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Typography />
        <Header theme={theme} themeToggler={themeToggler} />
        <SideNav theme={theme} themeToggler={themeToggler} />
        <InnerStyles>{children}</InnerStyles>
      </ThemeProvider>
    </>
  );
}
