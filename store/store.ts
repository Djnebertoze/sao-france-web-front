import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from "react-redux";
import userSlice from "./user/userSlice";
import membersSlice from "./members/membersSlice";
import shopSlice from "./shop/shopSlice";
import stripeSlice from "./stripe/stripeSlice";


/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
    reducer: {
        user: userSlice,
        members: membersSlice,
        shop: shopSlice,
        stripe: stripeSlice,
    },
    devTools: false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { user: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(selector: (state: RootState) => TSelected): TSelected =>
    useSelectorBase<RootState, TSelected>(selector);
