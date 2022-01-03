import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../api/apiConfig";
import { endpoints } from "../api/endpoints";
export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async function ({ page, sortField, sortDirection }) {
        const response = await apiCall.get(endpoints.getTasks, {
            params: {
                sort_field: sortField,
                sort_direction: sortDirection,
                page: page,
            },
        });
        return response.data.message;
    }
);

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async function ({ username, email, text }) {
        let bodyFormData = new FormData();
        bodyFormData.append("username", username);
        bodyFormData.append("email", email);
        bodyFormData.append("text", text);
        const response = await apiCall.post(endpoints.createTask, bodyFormData);
        return response.data;
    }
);

export const editTask = createAsyncThunk(
    "tasks/editTask",
    async function ({ id, text, status }) {
        let token = localStorage.getItem("token");
        let bodyFormData = new FormData();
        bodyFormData.append("text", text);
        bodyFormData.append("status", status);
        bodyFormData.append("token", token);
        const response = await apiCall.post(
            endpoints.editTask(id),
            bodyFormData
        );
        return response.data;
    }
);

export const login = createAsyncThunk("tasks/login", async function () {
    let bodyFormData = new FormData();
    bodyFormData.append("username", "admin");
    bodyFormData.append("password", "123");
    const response = await apiCall.post(endpoints.login, bodyFormData);
    return response.data.message;
});

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        status: null,
        error: null,
    },
    reducers: {
        toggleComplete(state, action) {
            const toggledTodo = state.tasks.find(
                (todo) => todo.id === action.payload.id
            );
            toggledTodo.completed = !toggledTodo.completed;
        },
    },
    extraReducers: {
        [fetchTasks.pending]: (state, action) => {
            state.status = "pending";
            state.error = null;
        },
        [fetchTasks.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.tasks = action.payload.tasks;
            state.numberOfPages = Math.ceil(
                action.payload.total_task_count / 3
            );
        },
        [fetchTasks.rejected]: (state, action) => {},
        [addTask.pending]: (state, action) => {
            state.status = "pending";
            state.error = null;
        },
        [addTask.fulfilled]: (state, action) => {
            state.status = "resolved";
            if (action.payload.status === "ok") {
                state.error = null;
                state.tasks.push(action.payload.message);
            } else {
                state.error = action.payload.message;
            }
            state.numberOfPages = Math.ceil(
                (action.payload.total_task_count + 1) / 3
            );
        },
        [addTask.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [login.pending]: (state, action) => {
            state.status = "pending";
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.status = "resolved";
            localStorage.setItem("token", action.payload.token);
        },
        [login.rejected]: (state, action) => {},
        [editTask.pending]: (state, action) => {
            state.status = "pending";
            state.error = null;
        },
        [editTask.fulfilled]: (state, action) => {
            state.status = "resolved";
            if (action.payload.status === "ok") {
                state.error = null;
                alert("задача отредактировано успешно");
            } else {
                state.error = action.payload.message;
            }
        },
        [editTask.rejected]: (state, action) => {},
    },
});

export const { toggleComplete } = taskSlice.actions;

export default taskSlice.reducer;
