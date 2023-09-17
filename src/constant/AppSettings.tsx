import AppPaths from './AppPaths';

const processEnv = import.meta.env;

export default {
  mainUrl: AppPaths.DASHBOARD,
  nodeEnv: processEnv.MODE,
};
