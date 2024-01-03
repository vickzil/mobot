import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice/authSlice";
import alertSlice from "./alertSlice/alertSlice";
import movieSlice from "./movieSlice/movieSlice";


  export function makeStore() {
    return configureStore({
        reducer: {
            oauth: authSlice,
            alert: alertSlice,
            movies: movieSlice,
        },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: { warnAfter: 800 },
          serializableCheck: { warnAfter: 800 },
        }),
    })
  }

  

  export const store = makeStore()

  export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
