import MainLayout from "@/components/layout/MainLayout";
import { generateMeta } from "@/lib/utils";
import Homepage from "@/features/Home/Homepage";

export async function generateMetadata() {
  return generateMeta({
    title: "Veepearl - Homepage",
    description:
      "Veepearl is web commerce platform for selling peals jewellery",
    canonical: "/",
  });
}

export default function Home() {
  return (
    <MainLayout>
      <Homepage />
    </MainLayout>
  );
}
