function Trust() {
    return (
      <section className="px-8 py-24 bg-gradient-to-b from-gray-950 to-black">
        {/* Stats Section */}
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by growing businesses
          </h2>
  
          <p className="text-gray-400 mb-16">
            Reliable infrastructure powered by PayAza, built for scale and
            performance.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                num: "99.9%",
                label: "Uptime",
                sub: "Highly reliable infrastructure",
              },
              {
                num: "1M+",
                label: "Transactions",
                sub: "Processed securely",
              },
              {
                num: "500+",
                label: "Businesses",
                sub: "Trust TapPay daily",
              },
              {
                num: "24/7",
                label: "Support",
                sub: "Always available",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="
                  bg-gray-900/60
                  backdrop-blur
                  border border-gray-800
                  rounded-2xl
                  p-8
                  transition-all duration-300
                  hover:border-green-500
                  hover:shadow-lg hover:shadow-green-500/10
                  hover:-translate-y-1
                "
              >
                <h3 className="text-4xl font-bold text-green-400 mb-2">
                  {stat.num}
                </h3>
  
                <p className="text-white font-medium">{stat.label}</p>
  
                <p className="text-gray-500 text-sm mt-2">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default Trust;