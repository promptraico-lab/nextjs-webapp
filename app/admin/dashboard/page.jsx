import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProfilePage from "@/components/profile";

export default function Page() {
  return (
    <ContentLayout title="Test">
        <ProfilePage />
    </ContentLayout>
  );
}