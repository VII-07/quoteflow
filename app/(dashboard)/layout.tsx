import { Header } from "@/components/layout/Header";
type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default DashboardLayout;
