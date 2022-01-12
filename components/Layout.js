import styled, { ThemeProvider } from 'styled-components';
import { Header } from './Header';
import { lightTheme, darkTheme } from './styles/ThemeConfig';
import { useDarkMode } from '../lib/useDarkMode';
import GlobalStyles from './styles/GlobalStyles';
import Typography from './styles/Typography';
import { SideNav } from './SideNav';
import { useUser } from '../lib/useUser';
import Login from './Login';

const InnerStyles = styled.main`
  width: calc(100vw - var(--sideNavWidth));
  max-width: var(--maxWidth);
  padding: var(--headerHeight) 0 0;
  margin-left: var(--sideNavWidth);
`;

export default function Layout({ children }) {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const user = useUser();
  const isLoggedIn = !!user;

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Typography />
        <Header theme={theme} themeToggler={themeToggler} />
        <SideNav theme={theme} themeToggler={themeToggler} />
        <InnerStyles>{isLoggedIn ? children : <Login />}</InnerStyles>
      </ThemeProvider>
    </>
  );
}
