export default function Config() {
  return {
    webpack: (config) => {
      config.module.rules.map((rule) => {
        if (
          typeof rule.test !== 'undefined'
        || typeof rule.oneOf === 'undefined'
        ) {
          return rule;
        }

        rule.oneOf.unshift({
          test: /.md$/,
          use: {
            loader: 'frontmatter-markdown-loader',
            options: {
              mode: ['html', 'react-component'],
            },
          },
        });

        return rule;
      });

      return config;
    },
  };
}
