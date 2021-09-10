module.exports = {
	async redirects() {
		return [
      {
        source: '/',
        destination: '/blacknwhite',
				permanent: true
      },
    ]
	},	
  reactStrictMode: true,
	images: {
    domains: ['res.cloudinary.com'],
  },
}
