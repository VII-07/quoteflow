import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Container>{props.children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
