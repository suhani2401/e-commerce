
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { useGetAxios } from "../api/hooks/useGetAxios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [getProductList, {isLoading}] = useGetAxios();

  useEffect(() => {
    const fetchProducts = async() => {
      const result = await getProductList('/products/list');
      setProducts(result.data as Product[])
    }
    fetchProducts();
  }, [])
  return (
    <>
      <Navbar title="Dashboard" />
      <div className="m-auto mt-3 p-1 max-w-7xl">
        {isLoading && (
          <div className="text-gray-500 text-xl text-center my-[20px] mx-0">
            Loading...
          </div>
        )}
        <div className="grid grid-cols-5 gap-10 p-2">
          {products && !isLoading &&
            products.map((item: Product, idx) => (
              <Card product={item} key={idx} purpose="products" />
            ))}
        </div>
      </div>
    </>
  );
}
 
export default Dashboard;