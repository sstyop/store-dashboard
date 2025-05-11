import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { fetchProducts } from '../../redux/slices/productsSlice';
import ProductCart from 'components/ProductCart';
import styles from './Home.module.css';
import { useCategories } from 'hooks/useCategories';
import RatingFilter from 'components/RatingFilter';
import { debounce } from 'utils/debounce';

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const categories = useCategories(items);

  const [activeCategory, setActiveCategory] = useState(null);
  const [ratingMin, setRatingMin] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    let updatedProducts = items;

    if (activeCategory) {
      updatedProducts = updatedProducts.filter(product => product.category === activeCategory);
    }

    updatedProducts = updatedProducts.filter(product => product.rating.rate >= ratingMin);

    if (debouncedQuery.trim()) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().startsWith(debouncedQuery.toLowerCase())
      );
    }

    if (sortOption && updatedProducts.length > 1) {
      updatedProducts = [...updatedProducts].sort((a, b) => {
        switch (sortOption) {
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          case "title-asc": return a.title.localeCompare(b.title);
          case "title-desc": return b.title.localeCompare(a.title);
          default: return 0;
        }
      });
    }

    return updatedProducts;
  }, [activeCategory, ratingMin, items, debouncedQuery, sortOption]);

  const filterByCategory = useCallback((category) => {
    setActiveCategory(prev => (prev === category ? null : category));
  }, []);

  const handleRatingChange = useCallback((min) => {
    setRatingMin(min);
  }, []);

  const debouncedSearch = useMemo(() => debounce(setDebouncedQuery, 500), []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  }, [debouncedSearch]);

  const handleSortChange = useCallback((event) => {
    setSortOption(event.target.value);
  }, []);

  const clearFilters = useCallback(() => {
    setActiveCategory(null);
    setRatingMin(0);
    setSearchQuery("");
    setSortOption("");
    setDebouncedQuery("");
  },[]);

  if (status === 'loading') return <p className={styles.loadErrorStates}>Loading...</p>;
  if (status === 'failed') return <p className={styles.loadErrorStates}>Error fetching products</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.mainContent}>
        <div className={styles.filter}>
          <div className={styles.filterHeader}>
            <h3 className={styles.blockTitle}>Filters</h3>
            <button className={styles.clearButton} onClick={clearFilters}>Clear Filters</button>
          </div>
          <div className={styles.filterBlock}>
            <h4 className={styles.filterTitle}>Find Your Item</h4>
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterBlock}>
            <h4 className={styles.filterTitle}>Categories</h4>
            {categories.map((category) => (
              <p
                key={category}
                className={classNames(styles.category,
                  {
                    [styles.active]: activeCategory === category
                  })}
                onClick={() => filterByCategory(category)}>
                {category}
              </p>
            ))}
          </div>
          <RatingFilter products={filteredProducts} onFilter={handleRatingChange} />
          <div className={styles.filterBlock}>
            <label htmlFor="sort" className={styles.filterTitle}>Sort By:</label>
            <select id="sort" value={sortOption} onChange={handleSortChange} className={styles.sortDropdown}>
              <option value="">None</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title: A-Z</option>
              <option value="title-desc">Title: Z-A</option>
            </select>
          </div>
        </div>
        <div className={styles.productList}>
          {filteredProducts.length === 0 ? (
            <p className={styles.emptyMessage}>No products found for selected filters.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;