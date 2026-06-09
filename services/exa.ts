import { ResearchBrief } from "@/types/operation";

type ExaSearchResult = {
  title?: string;
  url?: string;
  text?: string;
  highlights?: string[];
};

type ExaSearchResponse = {
  results?: ExaSearchResult[];
};

export async function researchWithExa(operation: string): Promise<ResearchBrief> {
  const apiKey = process.env.EXA_API_KEY;

  if (!apiKey) {
    return {
      summary:
        "Exa is not connected yet. SEO is currently using a simulated executive research brief.",
      signals: [
        "Add EXA_API_KEY to .env.local to enable live web research.",
        "SEO will use Exa to search venues, trends, event formats, and relevant vendor information.",
        "Research remains read-only; sensitive actions still require approval.",
      ],
      sources: [
        {
          title: "Exa API key missing",
          url: "https://dashboard.exa.ai",
        },
      ],
    };
  }

  const response = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      query: `${operation}. Find relevant Singapore venues, event planning trends, audience engagement activities, and budget considerations.`,
      numResults: 5,
      contents: {
        text: true,
        highlights: true,
      },
    }),
  });

  if (!response.ok) {
    return {
      summary:
        "SEO attempted live Exa research but the request failed. The system safely fell back to a simulated planning brief.",
      signals: [
        "Exa request failed safely without blocking the operation.",
        "SEO can continue planning using fallback recommendations.",
        "Live research can be retried once API configuration is corrected.",
      ],
      sources: [
        {
          title: "Exa request failed",
          url: "https://docs.exa.ai",
        },
      ],
    };
  }

  const data = (await response.json()) as ExaSearchResponse;
  const results = data.results ?? [];

  const signals = results
    .flatMap((result) => result.highlights ?? [])
    .filter(Boolean)
    .slice(0, 4);

  return {
    summary:
      results.length > 0
        ? "SEO completed live web research using Exa and extracted the most relevant signals for this operation."
        : "SEO connected to Exa, but no strong live results were returned for this operation.",
    signals:
      signals.length > 0
        ? signals
        : [
            "Prioritise venue capacity and accessibility.",
            "Compare estimated cost against the stated budget.",
            "Include interactive activities to improve audience engagement.",
          ],
    sources: results.slice(0, 4).map((result) => ({
      title: result.title || "Untitled source",
      url: result.url || "https://exa.ai",
    })),
  };
}