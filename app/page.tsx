



import { MyForm } from "@/components/blogs";
import PermissionsComponent from "@/components/permissionsComponent";


export default function Home() {
  return (
    <div>
      <h1>Role-Based Access Control Demo</h1>
      <PermissionsComponent />
      <MyForm />
    </div>
  );
}
