module.exports = function (api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          "app": ["./app/"],
        }
      }
      
    ]
  
  ];
  return {
    presets,
    plugins
  };
}