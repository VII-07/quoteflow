type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout = (props: DashboardLayoutProps) => {
    return (
        <main>
            {props.children}
        </main>
    );
};

export default DashboardLayout;