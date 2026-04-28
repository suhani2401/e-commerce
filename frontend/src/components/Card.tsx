import { useDispatch, useSelector } from "react-redux";
import type { AuthState, CartItem, CartState, Product } from "../types";
import { Button } from "./common/Button";
import { usePostAxios } from "../api/hooks/usePostAxios";
import { useDeleteAxios } from "../api/hooks/useDeleteAxios";
import { usePatchAxios } from "../api/hooks/usePatchAxios"; // create this
import { addToCart, removeFromCart, updateQuantity } from "../redux/reducers/cart.slice";
import { toast } from "react-toastify";

interface CardProperties {
    product?: Product;
    cart?: CartItem;
    purpose: string;
    onCartChange?: () => void;
}

const Card = (props: CardProperties) => {
    const loggedInUser = useSelector((state: { auth: AuthState }) => state.auth.loggedInUser);
    const cartItems = useSelector((state: { cart: CartState }) => state.cart.items);
    const dispatch = useDispatch();
    const [addItemToCart] = usePostAxios();
    const [removeCartItem] = useDeleteAxios();
    const [updateCartQuantity] = usePatchAxios();

    const isInCart = cartItems.some(item => item.product_id === props.product?.id);

    const handleCart = async (product_id?: string) => {
        if (product_id) {
            const result = await addItemToCart('/cart/add-to-cart', { product_id, quantity: 1 });
            if (result) {
                dispatch(addToCart(result.data));
                toast.info("Added To Cart Successfully");
            }
        }
    };

    const handleRemoveCartItem = async (cart_item_id: string) => {
        if (cart_item_id) {
            await removeCartItem(`/cart/remove-from-cart/${cart_item_id}`);
            dispatch(removeFromCart({ cart_item_id }));
            props.onCartChange?.();
        }
    };

    const handleQuantityChange = async (cart_item_id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        await updateCartQuantity('/cart/update-quantity', { quantity: newQuantity, cart_item_id });
        dispatch(updateQuantity({ cart_item_id, quantity: newQuantity }));
        props.onCartChange?.();
    };

    return (
        <>
            {props.purpose === "products" && props.product && (
                <div className="p-5 shadow-xl flex flex-col gap-3 bg-blue-800/10">
                    <img src={props.product.image} alt="" />
                    <span className="font-bold text-black/50 text-center">
                        ${props.product.price}
                    </span>
                    <p className="text-black/80 font-bold text-center line-clamp-1">
                        {props.product.name}
                    </p>
                    {loggedInUser && (
                        <Button
                            type="button"
                            disabled={isInCart} // ← disabled if already in cart
                            onClickHandler={() => handleCart(props.product?.id)}
                            className={`p-1 rounded-xl ${isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900'}`}
                        >
                            {isInCart ? "Added to Cart" : "Add to Cart"}
                        </Button>
                    )}
                </div>
            )}

            {props.purpose === "cart" && props.cart && (
                <div className="shadow-xl flex justify-around bg-blue-800/10 p-4">
                    <img src={props.cart.product?.image} alt="" className="size-40" />
                    <div className="flex flex-col gap-2 self-center">
                        <p className="text-black/80 font-bold text-center line-clamp-1">
                            {props.cart.product?.name}
                        </p>
                        <span className="font-bold text-black/50 text-center">
                            ${props.cart.product?.price}
                        </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 self-center">
                        <button
                            onClick={() => handleQuantityChange(String(props.cart?.id), Number(props.cart?.quantity) - 1)}
                            className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-lg"
                        >−</button>
                        <span className="font-bold text-black/70 w-6 text-center">
                            {props.cart.quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(String(props.cart?.id), Number(props.cart?.quantity) + 1)}
                            className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-lg"
                        >+</button>
                    </div>

                    <Button
                        type="button"
                        onClickHandler={() => handleRemoveCartItem(props.cart?.id as string)}
                        className={"bg-red-500 p-2 self-center rounded-xl"}
                    >Remove</Button>
                </div>
            )}

            {props.purpose === "order" && props.cart && (
                <div className="flex justify-around py-5 border-b border-black/30">
                    <img src={props.cart.product?.image} alt="" className="size-40" />
                    <div className="flex flex-col gap-2 self-center max-w-sm">
                        <h3 className="text-black/80 text-center line-clamp-1">
                            {props.cart.product?.name}
                        </h3>
                        <span className="font-bold text-black/50 text-center">
                            {props.cart.product?.description}
                        </span>
                    </div>
                    <p className="self-center font-bold text-black/80">
                        Quantity: {props.cart.quantity}
                    </p>
                    <p className="font-bold text-black/80 text-center self-center">
                        ${props.cart.product?.price}
                    </p>
                </div>
            )}
        </>
    );
};

export default Card;