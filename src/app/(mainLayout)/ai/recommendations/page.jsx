"use client";

import { generateRecommendations, refineRecommendations, sendRecommendationFeedback } from "@/lib/api/ai";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiFilter, FiRefreshCcw, FiThumbsDown, FiThumbsUp, FiTrash2, FiZap } from "react-icons/fi";

const initialPreferences = {
  searchText: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  preferredBrands: "",
  requiredFeatures: "",
  useCase: "",
  userPriorities: "",
  previouslyViewedProductIds: "",
  previouslySelectedProductIds: "",
  dismissedProductIds: "",
  additionalInstructions: "",
};

export default function RecommendationsPage() {
  const { data: session } = useSession();
  const [sessionId, setSessionId] = useState("");
  const [preferences, setPreferences] = useState(initialPreferences);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("match");

  const ensureSessionId = () => {
    if (sessionId) return sessionId;

    let stored = "";
    if (typeof window !== "undefined") {
      stored = localStorage.getItem("coxgo_ai_session_id") || "";
    }

    if (!stored) {
      stored = crypto.randomUUID();
      if (typeof window !== "undefined") {
        localStorage.setItem("coxgo_ai_session_id", stored);
      }
    }

    setSessionId(stored);
    return stored;
  };

  const recommendationSessionId = result?.recommendationSessionId;

  const sortedRecommendations = useMemo(() => {
    const items = result?.recommendations ? [...result.recommendations] : [];
    if (sortBy === "price") {
      return items.sort((a, b) => Number(a.product?.price || 0) - Number(b.product?.price || 0));
    }
    return items.sort((a, b) => b.matchScore - a.matchScore);
  }, [result, sortBy]);

  const update = (field, value) => setPreferences((current) => ({ ...current, [field]: value }));

  const submit = async (mode = "generate") => {
    if (loading) return;
    setLoading(true);
    setError("");

    const payload = {
      ...preferences,
      sessionId: ensureSessionId(),
      userId: session?.user?.id || "",
      recommendationSessionId,
    };

    try {
      const response = mode === "refine" ? await refineRecommendations(payload) : await generateRecommendations(payload);
      if (!response?.success) throw new Error(response?.error?.message || "Recommendation failed");
      setResult(response.result);
      toast.success(mode === "refine" ? "Recommendations refined" : "Recommendations generated");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const feedback = async (productId, interactionType) => {
    const response = await sendRecommendationFeedback({
      productId,
      interactionType,
      sessionId: ensureSessionId(),
      userId: session?.user?.id || "",
      recommendationSessionId,
    });

    if (response?.success) toast.success("Feedback saved");
  };

  const removeRecommendation = (productId) => {
    setResult((current) => ({
      ...current,
      recommendations: current.recommendations.filter((item) => item.productId !== productId),
    }));
    setPreferences((current) => ({
      ...current,
      dismissedProductIds: [current.dismissedProductIds, productId].filter(Boolean).join(", "),
    }));
    feedback(productId, "recommendation_dismissed");
  };

  return (
    <main className="bg-slate-50 py-8 md:py-12">
      <div className="container">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">AI product matching</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">Smart Product Recommendations</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Filter the real MongoDB catalog first, score candidates deterministically, then ask Gemini to rerank only those products.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Preferences</h2>
            <Field label="Search text" value={preferences.searchText} disabled={loading} onChange={(value) => update("searchText", value)} />
            <Field label="Category" value={preferences.category} disabled={loading} onChange={(value) => update("category", value)} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Min price" value={preferences.minPrice} disabled={loading} onChange={(value) => update("minPrice", value)} type="number" />
              <Field label="Max price" value={preferences.maxPrice} disabled={loading} onChange={(value) => update("maxPrice", value)} type="number" />
            </div>
            <TextArea label="Preferred brands" hint="Comma-separated" value={preferences.preferredBrands} disabled={loading} onChange={(value) => update("preferredBrands", value)} />
            <TextArea label="Required features" hint="Comma-separated" value={preferences.requiredFeatures} disabled={loading} onChange={(value) => update("requiredFeatures", value)} />
            <TextArea label="Use case" value={preferences.useCase} disabled={loading} onChange={(value) => update("useCase", value)} />
            <TextArea label="User priorities" hint="Comma-separated" value={preferences.userPriorities} disabled={loading} onChange={(value) => update("userPriorities", value)} />
            <TextArea label="Previously viewed products" hint="Product IDs" value={preferences.previouslyViewedProductIds} disabled={loading} onChange={(value) => update("previouslyViewedProductIds", value)} />
            <TextArea label="Previously selected products" hint="Product IDs" value={preferences.previouslySelectedProductIds} disabled={loading} onChange={(value) => update("previouslySelectedProductIds", value)} />
            <TextArea label="Dismissed products" hint="Product IDs" value={preferences.dismissedProductIds} disabled={loading} onChange={(value) => update("dismissedProductIds", value)} />
            <TextArea label="Additional instructions" value={preferences.additionalInstructions} disabled={loading} onChange={(value) => update("additionalInstructions", value)} />

            <div className="mt-5 flex flex-col gap-3">
              <button onClick={() => submit("generate")} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                <FiZap /> {loading ? "Generating..." : "Generate recommendations"}
              </button>
              <button onClick={() => submit("refine")} disabled={loading || !result} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50">
                <FiFilter /> Refine recommendations
              </button>
              <button onClick={() => setPreferences(initialPreferences)} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50">
                <FiTrash2 /> Clear preferences
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Recommendations</h2>
                <p className="text-sm text-slate-500">{result?.summary || "Database-backed matches will appear here."}</p>
              </div>
              <div className="flex gap-2">
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="match">Sort by match score</option>
                  <option value="price">Sort by price</option>
                </select>
                <button onClick={() => submit("refine")} disabled={loading || !result} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-50">
                  <FiRefreshCcw /> Alternatives
                </button>
              </div>
            </div>

            {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            {loading && <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">Scoring catalog products and reranking candidates...</div>}
            {!loading && !result && <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Set preferences and generate your first recommendation set.</div>}
            {!loading && result && sortedRecommendations.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                {result.emptyCatalog
                  ? "No catalog products were found, so AI Picks cannot recommend real products yet."
                  : "No recommendations remain. Try refining with broader preferences."}
              </div>
            )}

            <div className="space-y-4">
              {sortedRecommendations.map((item) => (
                <article key={item.productId} className={`rounded-lg border p-4 ${item.productId === result.bestMatchProductId ? "border-teal-300 bg-teal-50/40" : "border-slate-200"}`}>
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">{item.product?.category || "Product"}</p>
                      <h3 className="mt-1 text-lg font-bold text-slate-950">{item.product?.name || item.product?.title || item.productId}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.product?.brand || item.product?.brandName || "Brand not listed"} {item.product?.price ? `- ${item.product.price}` : ""}</p>
                    </div>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">{item.matchScore}%</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.reason}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <MiniList title="Strengths" items={item.strengths} />
                    <MiniList title="Trade-offs" items={item.tradeoffs} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={item.product?.detailUrl || `/products/${item.productId}`} onClick={() => feedback(item.productId, "recommendation_clicked")} className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                      View product
                    </Link>
                    <button onClick={() => feedback(item.productId, "recommendation_useful")} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"><FiThumbsUp /> Useful</button>
                    <button onClick={() => feedback(item.productId, "recommendation_not_useful")} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"><FiThumbsDown /> Not useful</button>
                    <button onClick={() => removeRecommendation(item.productId)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"><FiTrash2 /> Remove</button>
                  </div>
                </article>
              ))}
            </div>

            {result?.refinementSuggestions?.length > 0 && (
              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">Refinement suggestions</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.refinementSuggestions.map((suggestion) => (
                    <span key={suggestion} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{suggestion}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, disabled, type = "text" }) {
  return (
    <label className="mb-4 block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input type={type} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100" />
    </label>
  );
}

function TextArea({ label, value, onChange, disabled, hint }) {
  return (
    <label className="mb-4 block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {hint && <span className="ml-2 text-xs text-slate-400">{hint}</span>}
      <textarea rows={2} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100" />
    </label>
  );
}

function MiniList({ title, items }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      <div className="mt-2 space-y-1">
        {(items?.length ? items : ["Not specified"]).map((item) => (
          <p key={item} className="text-sm text-slate-600">- {item}</p>
        ))}
      </div>
    </div>
  );
}
