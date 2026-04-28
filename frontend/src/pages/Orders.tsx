
import { useEffect, useState } from "react";
import type { OrdersList } from "../types";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useGetAxios } from "../api/hooks/useGetAxios";

const Orders = () => {
  const [getOrderList, { isLoading }] = useGetAxios();
  const [orders, setOrders] = useState<OrdersList[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersList = await getOrderList('/orders/list');
      setOrders(ordersList.data as OrdersList[]);
    };
    fetchOrders();
  }, []);
  return (
    <>
      <Navbar title="Orders" />
      <div className="flex flex-col justify-center gap-5">
        {isLoading && (
          <div className="text-gray-500 text-xl text-center my-[20px] mx-0">
            Loading...
          </div>
        )}
        {orders.length == 0 && !isLoading && (
          <h2 className="text-black/70 text-center">No Orders</h2>
        )}
        <div className="grid grid-cols-1 gap-10">
          {orders.map((item, idx) => (
            <div className="bg-blue-800/10 shadow-xl px-5" key={idx}>
              <div className="flex justify-between items-center p-5">
                <p>Order ID: {item.id}</p>
                <p className="text-black/50 text-sm">
                  {new Date(item.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {item.ordered_items.map((cart_item, idx) => (
                <Card purpose="order" cart={cart_item} key={idx} />
              ))}
              <div className="flex gap-5 items-center justify-end p-5">
                <div className="flex flex-col justify-center items-end">
                  <div className="p-4"></div>
                  <div className="p-1">Shipping Cost:</div>
                  <div className="p-1">Total Cost:</div>
                </div>
                <div>
                  <div className="p-1">
                    {item.ordered_items.length !== 0 &&
                      "$" +
                      Math.round(
                        item.ordered_items.reduce(
                          (acc, p) => acc + p.product.price * p.quantity,
                          0
                        )
                      )}
                  </div>
                  <div className="p-1"> ${+(item.shipping_cost) / 100}</div>
                  <div className="p-1">${+(item.final_price) / 100}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
