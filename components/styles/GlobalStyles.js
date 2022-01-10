import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  :root {

    // Calculator

    --green: #0D703F;
    --yellow: #F1B73A;
    --red: #E6423A;
    --brown: #5B4A3B;
    --grey: #D3D8D2;
    --black: #292A2E;


    /*
      Highlight Colours

      note: --sample vars are NOT intended for use. These exist as helpers to illustrate the chosen colour with your chosen IDE colour highlighter.
     */

    /* Set HSL Luminence vars for colours */
    --li-darker: 6%;
    --li-darkest: 12%;

    /* Danger, Warning, Error */
    --danger--sample: hsl(360, 87%, 60%);
    --danger-color: 360, 87%;
    --danger-lum: 60%;
    --danger--base: hsl(var(--danger-color), var(--danger-lum));
    --danger--darker: hsl(var(--danger-color), calc(var(--danger-lum) - var(--li-darker)));
    --danger--darkest: hsl(var(--danger-color), calc(var(--danger-lum) - var(--li-darkest)));;

    /* Success, Positive, Action */
    --success--sample: hsl(158, 67%, 42%);
    --success-color: 158, 67%;
    --success-lum: 42%;
    --success--base: hsl(var(--success-color), var(--success-lum));
    --success--darker: hsl(var(--success-color), calc(var(--success-lum) - var(--li-darker)));
    --success--darkest: hsl(var(--success-color), calc(var(--success-lum) - var(--li-darkest)));;

    /* Info, Highlight, Link */
    --info--sample: hsl(210, 77%, 57%);
    --info-color: 210, 77%;
    --info-lum: 57%;
    --info--base: hsl(var(--info-color), var(--info-lum));
    --info--darker: hsl(var(--info-color), calc(var(--info-lum) - var(--li-darker)));
    --info--darkest: hsl(var(--info-color), calc(var(--info-lum) - var(--li-darkest)));;

    /* Layout and component vars */
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --headerHeight: 5rem;
    --sideNavWidth: 6rem;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    ${'' /* font-family: */}
    padding: 0;
    margin: 0;
    background: ${({ theme }) => theme.body};

  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

`;

export default GlobalStyles;
