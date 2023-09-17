import { memo, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  AppSettingInitialStateProps,
  setAppSettings,
} from '../reducers/slices/AppSettingsSlice';

interface SetupProviderOptions {
  children?: ReactNode;
  appSettings: AppSettingInitialStateProps;
}

const SetupProvider = ({ children, appSettings }: SetupProviderOptions) => {
  const dispatch = useDispatch();

  /** Set App Settings */
  useEffect(() => {
    dispatch(setAppSettings(appSettings));

  }, []);

  return <>{children}</>;
};

export default memo(SetupProvider);
