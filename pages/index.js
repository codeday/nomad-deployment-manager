import Router from 'next/router'
import '../styles/index.css'

const Home = () => <div />;
Home.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(301, {
      Location: '/jobs'
    });
    res.end();
  }
  return {};
};

export default Home;
