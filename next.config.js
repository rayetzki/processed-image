module.exports = {
	async redirects() {
		return [
      {
        source: '/',
        destination: '/animals',
				permanent: true
      },
    ]
	},	
  reactStrictMode: true,
	images: {
    domains: ['res.cloudinary.com'],
  },
}
