import { useEffect, useState } from 'react';

export const useCategories = (products) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (products.length) {
      // Extract unique categories from products and sort them alphabetically
      // Using Set to ensure uniqueness and then converting it back to an array
      const uniqueCategories = [...new Set(
        products.map((product) => product.category)
          .sort((a, b) => a.localeCompare(b))
      )];
      setCategories(uniqueCategories);
    }
  }, [products]);

  return categories;
};
