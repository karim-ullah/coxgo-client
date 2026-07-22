"use client";

import { generateProductDescription, regenerateProductDescription } from "@/lib/api/ai";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiCopy, FiRefreshCcw, FiTrash2, FiZap } from "react-icons/fi";

const initialForm = {
  productName: "",
  productCategory: "",
  brandName: "",
  mainFeatures: "",
  specifications: "",
  targetCustomer: "",
  productBenefits: "",
  tone: "Professional",
  keywords: "",
  outputLength: "Medium",
  template: "general",
  additionalInstructions: "",
};

const tones = ["Professional", "Friendly", "Persuasive", "Premium", "Simple", "SEO-focused"];
const lengths = ["Short", "Medium", "Long"];
const templates = [
  ["general", "General"],
  ["ecommerce", "E-commerce"],
  ["seo", "SEO"],
  ["social", "Social commerce"],
];

export default function ProductDescriptionPage() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const wordCount = useMemo(() => {
    const text = result?.fullDescription || "";
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [result]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (mode = "generate") => {
    if (!form.productName.trim() || loading) return;
    setLoading(true);
    setError("");

    try {
      const response =
        mode === "regenerate"
          ? await regenerateProductDescription({ input: form, previousOutput: result })
          : await generateProductDescription(form);

      if (!response?.success) {
        throw new Error(response?.error?.message || "AI generation failed");
      }

      setResult(response.result);
      toast.success(mode === "regenerate" ? "New version generated" : "Description generated");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text, label) => {
    if (!text) return;
    await navigator.clipboard.writeText(Array.isArray(text) ? text.join("\n") : text);
    toast.success(`${label} copied`);
  };

  const fullCopy = result
    ? `${result.title}\n\n${result.shortDescription}\n\n${result.fullDescription}\n\nFeatures:\n${result.features.join("\n")}\n\nBenefits:\n${result.benefits.join("\n")}\n\nSEO Meta:\n${result.metaDescription}\n\nKeywords: ${result.keywords.join(", ")}`
    : "";

  return (
    <main className="bg-slate-50 py-8 md:py-12">
      <div className="container">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">AI copy studio</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">Product Description Generator</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Turn product facts into structured product copy with titles, descriptions, bullets, benefits, SEO metadata, and keywords.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Product name" value={form.productName} disabled={loading} onChange={(value) => updateField("productName", value)} required />
              <Field label="Category" value={form.productCategory} disabled={loading} onChange={(value) => updateField("productCategory", value)} />
              <Field label="Brand" value={form.brandName} disabled={loading} onChange={(value) => updateField("brandName", value)} />
              <Select label="Tone" value={form.tone} options={tones} disabled={loading} onChange={(value) => updateField("tone", value)} />
              <Select label="Output length" value={form.outputLength} options={lengths} disabled={loading} onChange={(value) => updateField("outputLength", value)} />
              <Select label="Template" value={form.template} options={templates} disabled={loading} onChange={(value) => updateField("template", value)} />
            </div>

            <TextArea label="Main features" hint="Comma-separated tags work well" value={form.mainFeatures} disabled={loading} onChange={(value) => updateField("mainFeatures", value)} />
            <TextArea label="Specifications" value={form.specifications} disabled={loading} onChange={(value) => updateField("specifications", value)} />
            <TextArea label="Target customer" value={form.targetCustomer} disabled={loading} onChange={(value) => updateField("targetCustomer", value)} />
            <TextArea label="Product benefits" hint="Comma-separated benefit tags" value={form.productBenefits} disabled={loading} onChange={(value) => updateField("productBenefits", value)} />
            <TextArea label="Keywords" hint="Comma-separated keywords" value={form.keywords} disabled={loading} onChange={(value) => updateField("keywords", value)} />
            <TextArea label="Additional instructions" value={form.additionalInstructions} disabled={loading} onChange={(value) => updateField("additionalInstructions", value)} />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => submit("generate")}
                disabled={loading || !form.productName.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <FiZap /> {loading ? "Generating..." : "Generate description"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setResult(null);
                  setError("");
                }}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                <FiTrash2 /> Clear form
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Generated output</h2>
                <p className="text-sm text-slate-500">{wordCount} words in full description</p>
              </div>
              <div className="flex gap-2">
                <button disabled={!result || loading} onClick={() => copyText(fullCopy, "Full output")} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-50">
                  <FiCopy /> Copy all
                </button>
                <button disabled={!result || loading} onClick={() => submit("regenerate")} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-50">
                  <FiRefreshCcw /> Regenerate
                </button>
              </div>
            </div>

            {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            {loading && <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">Generating structured copy...</div>}
            {!loading && !result && <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Your product copy will appear here.</div>}
            {result && !loading && (
              <div className="space-y-4">
                <OutputSection title="Product title" content={result.title} onCopy={() => copyText(result.title, "Title")} />
                <OutputSection title="Short description" content={result.shortDescription} onCopy={() => copyText(result.shortDescription, "Short description")} />
                <OutputSection title="Full description" content={result.fullDescription} onCopy={() => copyText(result.fullDescription, "Full description")} />
                <OutputList title="Key features" items={result.features} onCopy={() => copyText(result.features, "Features")} />
                <OutputList title="Customer benefits" items={result.benefits} onCopy={() => copyText(result.benefits, "Benefits")} />
                <OutputSection title="SEO meta description" content={result.metaDescription} onCopy={() => copyText(result.metaDescription, "Meta description")} />
                <OutputList title="Suggested keywords" items={result.keywords} inline onCopy={() => copyText(result.keywords.join(", "), "Keywords")} />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, disabled, required }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}{required ? " *" : ""}</span>
      <input value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100" />
    </label>
  );
}

function Select({ label, value, options, onChange, disabled }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100">
        {options.map((option) => {
          const value = Array.isArray(option) ? option[0] : option;
          const label = Array.isArray(option) ? option[1] : option;
          return <option key={value} value={value}>{label}</option>;
        })}
      </select>
    </label>
  );
}

function TextArea({ label, value, onChange, disabled, hint }) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {hint && <span className="ml-2 text-xs text-slate-400">{hint}</span>}
      <textarea rows={3} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100" />
    </label>
  );
}

function OutputSection({ title, content, onCopy }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <button onClick={onCopy} className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100" aria-label={`Copy ${title}`}><FiCopy /></button>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{content}</p>
    </div>
  );
}

function OutputList({ title, items, onCopy, inline }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <button onClick={onCopy} className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100" aria-label={`Copy ${title}`}><FiCopy /></button>
      </div>
      <div className={inline ? "flex flex-wrap gap-2" : "space-y-2"}>
        {items.map((item) => inline ? <span key={item} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">{item}</span> : <p key={item} className="text-sm text-slate-700">- {item}</p>)}
      </div>
    </div>
  );
}
