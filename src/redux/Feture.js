import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    inputValue: '',
    copytextIndex: null,
  },
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCopytextIndex: (state, action) => {
      state.copytextIndex = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.inputValue = '';
      state.loading = false;
    },
  },
});

export const {
  setInputValue,
  setMessages,
  addMessage,
  setLoading,
  setCopytextIndex,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
