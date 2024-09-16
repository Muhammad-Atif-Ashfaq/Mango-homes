import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content/Content";
import Page from "../../components/page";
const Landing = () => {
  return (
    <Page title="Welcome">
      <Header />
      <Content />
      {/* <Footer /> */}
    </Page>
  );
};

export default Landing;
