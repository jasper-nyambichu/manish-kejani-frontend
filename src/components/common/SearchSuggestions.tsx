// src/components/common/SearchSuggestions.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock } from 'lucide-react';
import api from '@/lib/api';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { useCategories } from '@/hooks/useCategories';

interface CategoryItem {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
}

interface ProductItem {
  _id?: string;
  id?: string;
  name: string;
}

interface Suggestion {
  id: string;
  name: string;
  type: 'category' | 'product';
  slug?: string;
}

interface Props {
  categoryId?:   string;
  onSearch:      (query: string) => void;
  onTrigger?:    () => void;
  registerCommit?: (fn: () => void) => void;
}

const highlight = (text: string, query: string) => {
  if (!query.trim()) return <span className="font-bold text-gray-800">{text}</span>;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  
  if (index === -1) return <span className="font-bold text-gray-800">{text}</span>;
  
  const before = text.substring(0, index);
  const matched = text.substring(index, index + query.length);
  const after = text.substring(index + query.length);
  
  return (
    <>
      {before && <span className="font-bold text-gray-800">{before}</span>}
      <span className="font-normal text-gray-800">{matched}</span>
      {after && <span className="font-bold text-gray-800">{after}</span>}
    </>
  );
};

const SearchSuggestions = ({ categoryId, onSearch, registerCommit }: Props) => {
  const navigate                          = useNavigate();
  const { history, save, remove, clear }  = useSearchHistory();
  const { data: categories = [] }         = useCategories();
  const [query,       setQuery]           = useState('');
  const [suggestions, setSuggestions]     = useState<Suggestion[]>([]);
  const [open,        setOpen]            = useState(false);
  const [activeIdx,   setActiveIdx]       = useState(-1);
  const [loading,     setLoading]         = useState(false);
  const inputRef                          = useRef<HTMLInputElement>(null);
  const containerRef                      = useRef<HTMLDivElement>(null);
  const debounceRef                       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const commitRef                         = useRef<(q: string) => void>(() => {});

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

  const fetchSuggestions = useCallback(async (q: string) => {
    if (!q.trim()) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const lowerQ = q.toLowerCase();
      const matchingCats = (categories as CategoryItem[])
        .filter(c => c.name.toLowerCase().includes(lowerQ))
        .slice(0, 2)
        .map(c => ({ id: c._id ?? c.id ?? '', name: c.name, type: 'category' as const, slug: c.slug }));

      const params = new URLSearchParams({ q, limit: '6' });
      if (categoryId) params.append('category', categoryId);
      const { data } = await api.get(`/api/v1/products/search?${params}`);
      
      const products: ProductItem[] = data?.data?.products ?? [];
      const productSugs = products.map(p => ({
          id:    p.id ?? p._id ?? '',
          name:  p.name,
          type: 'product' as const
      }));

      const combined = [...matchingCats, ...productSugs];
      const unique: Suggestion[] = [];
      const seen = new Set<string>();
      for (const s of combined) {
        const lowerName = s.name.toLowerCase();
        if (!seen.has(lowerName)) {
          seen.add(lowerName);
          unique.push(s);
        }
      }
      
      setSuggestions(unique.slice(0, 8));
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setActiveIdx(-1);
    setOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const commit = useCallback((q: string | Suggestion) => {
    if (typeof q === 'string') {
      if (!q.trim()) return;
      save(q.trim());
      onSearch(q.trim());
      setQuery(q.trim());
      setOpen(false);
      setActiveIdx(-1);
      const params = new URLSearchParams({ q: q.trim() });
      if (categoryId) params.append('category', categoryId);
      navigate(`/search?${params}`);
    } else {
      if (q.type === 'category') {
        save(q.name);
        setQuery(q.name);
        setOpen(false);
        setActiveIdx(-1);
        navigate(`/category/${q.slug}`);
      } else {
        commit(q.name);
      }
    }
  }, [save, onSearch, categoryId, navigate]);

  useEffect(() => {
    commitRef.current = (q: string) => commit(q);
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
        if (query.trim()) {
          const s = suggestions[activeIdx];
          if (s) commit(s);
        } else {
          const h = history[activeIdx] as string;
          if (h) commit(h);
        }
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
    <div ref={containerRef} className="relative w-full h-full bg-white rounded flex items-center">
      <div className="absolute left-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-500" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder="Search products, brands and categories"
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full h-full pl-[40px] pr-2 bg-transparent text-gray-900 text-[15px] font-body focus:outline-none rounded placeholder-gray-500"
        autoComplete="off"
      />

      {(showHistory || showSuggestions) && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 shadow-xl overflow-hidden"
          style={{ borderRadius: '0 0 4px 4px', marginTop: 0 }}>

          {showHistory && (
            <>
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Recent Searches</span>
                <button onMouseDown={e => { e.preventDefault(); clear(); }}
                  className="text-xs text-[#f68b1e] hover:underline font-bold">Clear</button>
              </div>
              {history.map((h, i) => (
                <div
                  key={h}
                  onMouseDown={(e) => { e.preventDefault(); commit(h); }}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${activeIdx === i ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  <span className="flex items-center gap-3 text-[15px] p-0 m-0 font-body text-gray-800 min-w-0">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{h}</span>
                  </span>
                  <button
                    onMouseDown={e => { e.stopPropagation(); e.preventDefault(); remove(h); }}
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </>
          )}

          {showSuggestions && (
            loading ? (
              <div className="px-4 py-3 text-[15px] text-gray-500 font-body bg-white">Searching...</div>
            ) : (
              suggestions.map((s, i) => (
                <div
                  key={s.id}
                  onMouseDown={(e) => { e.preventDefault(); commit(s); }}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors bg-white ${activeIdx === i ? '!bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="flex-1 text-[15px] font-body truncate min-w-0 flex items-center">
                    {highlight(s.name, query)}
                    {s.type === 'category' && (
                      <span className="ml-2 text-[9px] uppercase font-bold tracking-wider text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
                        Category
                      </span>
                    )}
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
