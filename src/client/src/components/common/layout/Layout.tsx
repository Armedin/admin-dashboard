import styled from "@emotion/styled";
import Aside from "./Aside";
import Header from "./Header";

interface LayoutProps {
  children?: React.ReactNode;
  pageProps?: any;
}

const Container = styled("div")({
  display: "flex",
  width: "100%",
  flex: "1 1 auto",
});
const Wrapper = styled("div")({
  paddingLeft: "260px",
  paddingTop: "65px",
  flex: "1 1 100%",
  transition: "padding-left .3s ease",
  display: "flex",
  flexDirection: "column",
});
const PageBody = styled("div")({
  flex: "1 1 100%",
  minWidth: 0,
  padding: "2rem",
});

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Aside />
      <Wrapper>
        <Header />
        <PageBody className="page-content">{children}</PageBody>
      </Wrapper>
    </Container>
  );
};

export default Layout;
