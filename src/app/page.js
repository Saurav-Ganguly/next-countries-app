import Image from "next/image";
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/countries");
  return (
    <main>
      <h1>Welcome to the Countries of the World</h1>
    </main>
  );
}
