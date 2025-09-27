import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default async function Layout({ children, }) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}

//page.tsx