import PortfolioExperience from "@/components/PortfolioExperience";
import { getPortfolio } from "@/lib/api";

export default async function HomePage() {
  const data = await getPortfolio();
  return <PortfolioExperience data={data} />;
}
