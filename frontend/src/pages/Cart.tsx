import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Button } from "../components/common/Button";
import { useGetAxios } from "../api/hooks/useGetAxios";
import { usePostAxios } from "../api/hooks/usePostAxios";
import { setCart } from "../redux/reducers/cart.slice";
import type { CartState } from "../types";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: { cart: CartState }) => state.cart.items);
    const [getCartList, { isLoading }] = useGetAxios();
    const [handleCheckoutApi] = usePostAxios();

    const fetchCartList = async () => {
        const response = await getCartList('/cart/list');
        dispatch(setCart(response.data));
    };

    useEffect(() => {
        fetchCartList();
    }, []);

    const handleCheckout = async () => {
        const session_url = await handleCheckoutApi('/orders/create-checkout-session', {});
        window.location.href = session_url.data as string;
    };

    return (
        <>
            <Navbar title="Cart" />
            <div className="flex flex-col justify-center gap-5">
                {isLoading && (
                    <div className="text-gray-500 text-xl text-center my-[20px] mx-0">
                        Loading...
                    </div>
                )}
                <div className="grid grid-cols-1 gap-10">
                    {cartItems.map((cart_item, idx) => (
                        <Card
                            purpose="cart"
                            cart={cart_item}
                            key={idx}
                            onCartChange={fetchCartList} // refetch after any change
                        />
                    ))}
                </div>
                {cartItems.length === 0 && !isLoading && (
                    <h2 className="text-black/70 text-center">No Products in Cart</h2>
                )}
                {cartItems.length !== 0 && (
                    <div className="flex gap-5 items-center justify-end p-2">
                        <div className="px-4 py-2.5 bg-black/10 border border-black/10 rounded-xl">
                            Total Cost: $
                            {cartItems.reduce((acc, item) => acc + (Number(item.product?.price) * Number(item.quantity)), 0).toFixed(2)}
                        </div>
                        <Button
                            type="button"
                            className="bg-blue-600 py-2 px-4 mt-1 rounded-xl"
                            onClickHandler={handleCheckout}
                        >CheckOut</Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;