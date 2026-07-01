import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  knowledgeSearch,
  type KnowledgeResultKind,
  type KnowledgeSearchResult,
} from "@/lib/knowledge-search";

const KIND_LABELS: Record<KnowledgeResultKind, string> = {
  guide: "Guide",
  compound: "Compound",
  mechanism: "Mechanism",
  glossary: "Glossary",
  methodology: "Methodology",
  category: "Section",
};

/**
 * Research-Hub-only search UI. Talks to the `knowledgeSearch` adapter, which
 * is a swappable interface — Release 2 can back it with a real index without
 * changing this component or its consumers.
 */
export function KnowledgeSearch({
  placeholder = "Search guides, compounds, mechanisms, glossary…",
  kinds,
  className = "",
}: {
  placeholder?: string;
  kinds?: readonly KnowledgeResultKind[];
  className?: string;
}) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<KnowledgeSearchResult[]>([]);
  const [pending, setPending] = useState(false);

  const availableKinds = useMemo<KnowledgeResultKind[]>(
    () => (kinds ? [...kinds] : ["guide", "compound", "mechanism", "glossary", "methodology"]),
    [kinds],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const r = await knowledgeSearch.search({ q, kinds: availableKinds });
      setResults(r);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={onSubmit} className="flex gap-2" role="search">
        <label htmlFor="knowledge-search" className="sr-only">Search the Research Hub</label>
        <div className="flex-1 flex items-center border border-navy-deep/20 bg-white focus-within:border-gold">
          <Search className="w-4 h-4 mx-3 text-navy-deep/50" aria-hidden="true" />
          <input
            id="knowledge-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="flex-1 py-3 pr-3 text-sm bg-transparent outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="px-5 bg-navy-deep text-bone text-[11px] font-bold tracking-widest hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60"
        >
          {pending ? "…" : "SEARCH"}
        </button>
      </form>

      <p className="text-[11px] text-muted-foreground mt-2">
        Knowledge search covers guides, compounds, mechanisms, methodology and the glossary. Full
        educational index goes live in Release 2.
      </p>

      {results.length > 0 && (
        <ul className="mt-5 divide-y divide-navy-deep/10 border border-navy-deep/10 bg-white">
          {results.map((r) => (
            <li key={r.id}>
              <Link
                to={r.href}
                className="flex items-start gap-3 p-4 hover:bg-bone focus-visible:bg-bone focus-visible:outline-2 focus-visible:outline-gold"
              >
                <span className="text-[9px] font-bold tracking-widest text-gold border border-gold/40 px-1.5 py-0.5 mt-0.5">
                  {KIND_LABELS[r.kind].toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold text-navy-deep">{r.title}</span>
                  {r.summary && (
                    <span className="block text-xs text-muted-foreground mt-0.5">{r.summary}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
