export const pluginDetail = {
  title: '',
  shortDesc: '',
  user: '',
  slug: '',
  bitbucketRepoUrl: '',
  price: '',
  codebase: [],
  language: [],
  image: '',
}

export const initialState = {
  pluginErrors: {},
  success: false,
  pluginDetail,
  plugins: [],
  userplugins: [],
  relatedPlugins: [],
  topPlugins: [],
};

export default initialState;
