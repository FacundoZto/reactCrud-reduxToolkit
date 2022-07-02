import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Task 1",
    description: "Task 1 description",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Task 2 description",
    completed: false,
  },
];

//para crear los estados, redux toolkit nos ofrece los Slice.
//cada estado tendra su reducer donde podremos definir funciones para actualizar al estado(acciones para el CRUD).
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks: (state, action) => {
      //el evento que le pasamos lo recibo con el action.payload
      //console.log(state, action);
      return [...state, action.payload];
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, description } = action.payload;
      const foundTask = state.find((task) => task.id === id);
      //al pasar una referencia y no una copia, modifica al array original
      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
      }
    },
  },
});

//exportamos las acciones del taskSlice.actions
export const { addTasks, deleteTask, updateTask } = taskSlice.actions;

//el taskSlice es un objeto, del cual podemos exportar por default sus propiedades:
export default taskSlice.reducer;
