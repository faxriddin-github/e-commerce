import { ProductType } from './interface';
import Product from './components/product';
import Hero from './components/hero';
import Link from 'next/link';

export default async function Home() {
  let products: ProductType[] = [];
  try {
    const res = await fetch('https://fakestoreapi.in/api/products', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    products = data.products as ProductType[]; // ✅ correctly accessing the products array
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <main className="max-w-7xl mx-auto md:px-8 xl:px-0">
      <Hero />
      <section className="flex flex-col space-y-12 py-6 md:py-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-4">NEXT SHOP DEALS</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 p-2">
          {products.length > 0 ? (
            products.slice(0, 12).map((product) => (
              <Product key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">No products available</p>
          )}
        </div>
        <div className="flex justify-center mt-2 md:mt-4">
            <Link href='/products'>
            <button
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
            >
              All products
            </button></Link>
          </div>
      </section>
    </main>
  );
}
