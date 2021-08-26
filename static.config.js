import path from 'path'

const Config = {
  plugins: [
    require.resolve('react-static-plugin-sass'),
    [
      require.resolve('react-static-plugin-favicons'),
      {
        inputFile: path.resolve(__dirname, 'src/assets/logo.png'),
        configuration: {
          appName: 'The Alpha Project',
          appShortName: 'Alpha Project',
          appDescription: 'The home of everything related to pre-release versions of World of Warcraft',
          developerName: null,
          developerURL: null,
          dir: 'ltr',
          lang: 'en-US',
          background: '#fff',
          theme_color: '#fff',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          loadManifestWithCredentials: false,
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: true,
            favicons: true,
            firefox: true,
            windows: true,
            yandex: true,
          },
        }
      }
    ],
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
};

export default Config;