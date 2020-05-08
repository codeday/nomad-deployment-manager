import Theme from '@codeday/topo/Theme';

export default ({ Component, pageProps }) => (
  <Theme brandColor="red">
    <Component {...pageProps} />
  </Theme>
);