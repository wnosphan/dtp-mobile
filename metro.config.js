const { getDefaultConfig: getExpoDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getExpoDefaultConfig(__dirname);

const config = {
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
};

module.exports = mergeConfig(defaultConfig, config); 