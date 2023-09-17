/* eslint-disable camelcase */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AppPaths from '../../constant/AppPaths';
import { NavbarSideAnchorOptions } from '../../components/Navbar';

export interface AppSettingInitialStateProps {
  mainUrl: string;
  sideBarAnchor?: NavbarSideAnchorOptions;
  showSideBarAnchor?: boolean;
  showMainPage?: boolean;
}

const initialState: AppSettingInitialStateProps = {
  mainUrl: AppPaths.DASHBOARD,
  sideBarAnchor: undefined,
  showSideBarAnchor: false,
  showMainPage: true,
};

export const AppSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setMainUrl: (state, { payload }: PayloadAction<string>) => {
      state.mainUrl = payload || initialState.mainUrl;
    },
    setAppSettings: (
      state,
      { payload }: PayloadAction<AppSettingInitialStateProps>,
    ) => {
      state.mainUrl = payload?.mainUrl || initialState.mainUrl;
    },
    setSideBarAnchor: (state, { payload }: PayloadAction<any>) => {
      state.sideBarAnchor = payload.data;
      state.showSideBarAnchor = payload.showSideBarAnchor;
    },
    setShowMainPage: (state, { payload }: PayloadAction<any>) => {
      state.showMainPage = payload.data;
    },
  },
});

export const {
  setMainUrl,
  setAppSettings,
  setSideBarAnchor,
  setShowMainPage,
} = AppSettingsSlice.actions;

export const getAppSettings = ({
  appSettings,
}: {
  appSettings: AppSettingInitialStateProps;
}) => ({
  appSettings,
});

export default AppSettingsSlice;
