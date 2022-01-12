import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`

  @font-face {
    font-family: 'IBM Plex Sans';
    src: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap';
  }
  html {
    ${
      '' /* font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
    }
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
    color: ${({ theme }) => theme.textPrimary};
    font-size: 10px;
  }

  body {
    font-size: 1.5rem;
    line-height:2;
    font-weight: 200;
  }

  p, li {
    letter-spacing: 0.5px;
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.textPrimary};
    text-decoration: none;
    font-weight: 400;
  }
    a:hover {
    text-decoration: underline;
    text-decoration-color: var(--success-base);
  }

  button {
    font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  mark, .mark {
    background: var(--success-base);
    padding: 0 2px 2px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
  }
  .center {
    text-align: center;
  }
  .tilt {
    transform: rotate(-2deg);
  }
`;

export default Typography;
