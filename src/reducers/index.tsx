import AppSettingsSlice from './slices/AppSettingsSlice';

export const AppReducers = {
  [AppSettingsSlice.name]: AppSettingsSlice.reducer,
};

export * from './slices/AppSettingsSlice';
export { default as AppSettingsSlice } from './slices/AppSettingsSlice';

