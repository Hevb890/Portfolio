import { portfolioData } from "@/data/portfolio";
import type { PortfolioData } from "@/types/portfolio";

const API_URL = process.env.API_URL;
const REVALIDATE_SECONDS = 300;

function isPortfolioData(value: unknown): value is PortfolioData {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<PortfolioData>;
  return (
    typeof candidate.owner?.name === "string" &&
    Array.isArray(candidate.nodes) &&
    candidate.nodes.length > 0 &&
    Array.isArray(candidate.satellites)
  );
}

/**
 * Loads portfolio content. Uses the FastAPI service when `API_URL` is set and
 * falls back to the bundled static data if the service is unset, down or invalid.
 */
export async function getPortfolio(): Promise<PortfolioData> {
  if (!API_URL) return portfolioData;

  try {
    const response = await fetch(`${API_URL}/api/v1/portfolio`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`Portfolio API responded with ${response.status}`);

    const payload: unknown = await response.json();
    if (!isPortfolioData(payload)) throw new Error("Portfolio API returned an unexpected shape");
    return payload;
  } catch (error) {
    console.error("[portfolio] Falling back to static data:", error);
    return portfolioData;
  }
}
