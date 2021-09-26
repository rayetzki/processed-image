module.exports = {	
	webpack(config) {
		config.module.rules.push({
      test: /\.svg$/,
     	issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    });

		return config;
	},
  reactStrictMode: true,
	images: {
    domains: ['res.cloudinary.com'],
  },
}
