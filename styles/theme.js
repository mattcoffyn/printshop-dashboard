import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'IBM Plex Sans', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif`,
    body: `'IBM Plex Sans', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'gray.900')(props),
        lineHeight: 'base',
      },
    }),
  },
});

export default theme;
