// src/components/common/SearchSuggestions.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock } from 'lucide-react';
import api from '@/lib/api';
import { useSearchHistory } from '@/hooks/useSearchHistory';

interface Suggestion {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface Props {
  categoryId:    string;
  onSearch:      (query: string) => void;
  onTrigger?:    () => void;   // called by parent search button
  registerCommit?: (fn: () => void) => void; // lets parent fire commit
}

const highlight = (text: string, query: string) => {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? <strong key={i} className="font-bold text-foreground">{part}</strong> : part
      )}
    </>
  );
};

const SearchSuggestions = ({ categoryId, onSearch, registerCommit }: Props) => {
  const navigate                          = useNavigate();
  const { history, save, remove, clear }  = useSearchHistory();
  const [query,       setQuery]           = useState('');
  const [suggestions, setSuggestions]     = useState<Suggestion[]>([]);
  const [open,        setOpen]            = useState(false);
  const [activeIdx,   setActiveIdx]       = useState(-1);
  const [loading,     setLoading]         = useState(false);
  const inputRef                          = useRef<HTMLInputElement>(null);
  const containerRef                      = useRef<HTMLDivElement>(null);
  const debounceRef                       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const commitRef                         = useRef<(q: string) => void>(() => {});

  // Click outside → close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIdx(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounced fetch suggestions
  const fetchSuggestions = useCallback(async (q: string) => {
    if (!q.trim()) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const params = new URLSearchParams({ q, limit: '6' });
      if (categoryId) params.append('category', categoryId);
      const { data } = await api.get(`/api/v1/products/search?${params}`);
      const products: any[] = data?.data?.products ?? [];
      setSuggestions(
        products.slice(0, 6).map(p => ({
          id:    p.id ?? p._id,
          name:  p.name,
          price: p.price,
          image: p.images?.[0]?.url ?? p.image ?? '',
        }))
      );
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setActiveIdx(-1);
    setOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const commit = useCallback((q: string) => {
    if (!q.trim()) return;
    save(q.trim());
    onSearch(q.trim());
    setQuery(q.trim());
    setOpen(false);
    setActiveIdx(-1);
    const params = new URLSearchParams({ q: q.trim() });
    if (categoryId) params.append('category', categoryId);
    navigate(`/search?${params}`);
  }, [save, onSearch, categoryId, navigate]);

  // Register commit with parent so the external button can fire it
  useEffect(() => {
    commitRef.current = commit;
    registerCommit?.(() => commit(query));
  }, [commit, query, registerCommit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = query.trim() ? suggestions : history;
    if (!open || items.length === 0) {
      if (e.key === 'Enter') commit(query);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0) {
        const selected = query.trim() ? suggestions[activeIdx]?.name : history[activeIdx];
        if (selected) commit(selected);
      } else {
        commit(query);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIdx(-1);
    }
  };

  const showHistory     = open && !query.trim() && history.length > 0;
  const showSuggestions = open && !!query.trim() && (loading || suggestions.length > 0);

  return (
    // containerRef wraps the full-width slot so the dropdown inherits the correct width
    <div ref={containerRef} className="relative w-full h-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder="Search products..."
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full h-full pl-3 pr-2 bg-secondary text-foreground text-sm font-body focus:outline-none"
        autoComplete="off"
      />

      {/* Dropdown — anchored to the full search-bar width via left-0/right-0 on the parent */}
      {(showHistory || showSuggestions) && (
        <div className="absolute top-full left-0 right-0 z-50 bg-card border border-border shadow-lg overflow-hidden"
          style={{ borderRadius: '0 0 8px 8px', marginTop: 1 }}>

          {/* Recent searches */}
          {showHistory && (
            <>
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recent Searches</span>
                <button onMouseDown={e => { e.preventDefault(); clear(); }}
                  className="text-xs text-primary hover:underline">Clear History</button>
              </div>
              {history.map((h, i) => (
                <div
                  key={h}
                  onMouseDown={() => commit(h)}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${activeIdx === i ? 'bg-secondary' : 'hover:bg-secondary'}`}
                >
                  <span className="flex items-center gap-2 text-sm font-body text-foreground min-w-0">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{h}</span>
                  </span>
                  <button
                    onMouseDown={e => { e.stopPropagation(); e.preventDefault(); remove(h); }}
                    className="ml-2 flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Live suggestions */}
          {showSuggestions && (
            loading ? (
              <div className="px-3 py-3 text-sm text-muted-foreground font-body">Searching...</div>
            ) : (
              suggestions.map((s, i) => (
                <div
                  key={s.id}
                  onMouseDown={() => commit(s.name)}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 py-2 cursor-pointer transition-colors ${activeIdx === i ? 'bg-secondary' : 'hover:bg-secondary'}`}
                >
                  {/* Thumbnail — hidden on very small screens to save space */}
                  <div className="hidden xs:flex w-9 h-9 flex-shrink-0 rounded bg-secondary overflow-hidden border border-border items-center justify-center">
                    {s.image
                      ? <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                      : <Search className="w-4 h-4 text-muted-foreground" />
                    }
                  </div>
                  <span className="flex-1 text-sm font-body text-muted-foreground truncate min-w-0">
                    {highlight(s.name, query)}
                  </span>
                  <span className="text-xs sm:text-sm font-body font-semibold text-foreground flex-shrink-0 whitespace-nowrap">
                    KSh {s.price.toLocaleString()}
                  </span>
                </div>
              ))
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
