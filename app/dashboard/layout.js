import DashboardShell from "@/components/DashboardShell";

export const metadata = { title: "Dashboard", robots: { index: false } };

export default function Layout({ children }) {
    return <DashboardShell>{children}</DashboardShell>;
}
