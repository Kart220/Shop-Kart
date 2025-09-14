import React, { useState, useMemo } from "react";
import productsData from "./data/products";
import Header from "./components/Header";
import ProductCard from "./components/Product Card";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none");

  const categories = useMemo(
    () => ["All", ...new Set(productsData.map((p) => p.category))],
    []
  );

  const filtered = useMemo(() => {
    let arr = productsData.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (category !== "All") arr = arr.filter((p) => p.category === category);

    if (sort === "price-asc") arr = arr.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr = arr.slice().sort((a, b) => b.price - a.price);
    if (sort === "rating-desc") arr = arr.slice().sort((a, b) => b.rating - a.rating);

    return arr;
  }, [query, category, sort]);

  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <section className="controls">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select"
          >
            <option value="none">Sort: None</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating: High → Low</option>
          </select>
        </section>
        <section className="grid">
          {filtered.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </section>
        {filtered.length === 0 && <p className="empty">No products found.</p>}
      </main>
      <footer className="footer">Made with Vite+React</footer>
    </div>
  );
}