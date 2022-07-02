import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice.js";

//Importamos y guardamos los reducer de cada estado.

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
