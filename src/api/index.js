export async function fetchProductsAPI() {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function fetchSingleProductAPI(productId) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}products/${productId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}