import Link from "next/link"

export function SiteFooter() {
  const collections = [
    { name: "Living Room", href: "/products?category=living-room" },
    { name: "Bedroom", href: "/products?category=bedroom" },
    { name: "Dining Room", href: "/products?category=dining-room" },
    { name: "Storage", href: "/products?category=storage" }
  ]

  const popularCategories = [
    { name: "Modern Oak Lounge Chair", href: "/products" },
    { name: "Walnut Coffee Table", href: "/products" },
    { name: "Beige Three-Seater Sofa", href: "/products" },
    { name: "Oak Bedside Table", href: "/products" },
    { name: "Wooden Dining Chair Set", href: "/products" },
    { name: "Modern Sideboard Console", href: "/products" }
  ]

  const deliveryCities = [
    { name: "Bhubaneswar" },
    { name: "Cuttack" },
    { name: "Puri" },
    { name: "Khordha" },
    { name: "Kolkata" },
    { name: "All Over Odisha" }
  ]

  return (
    <footer className="border-t bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/placeholder-logo.png" alt="" className="h-8 w-8" />
              <span className="font-bold text-xl text-white">ARCHIK HOMES</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Premium furniture and interior design solutions for luxury living.
            </p>
            <div className="flex gap-3">
              <a href="tel:+919583530095" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                📞
              </a>
              <a href="mailto:info@archikconstruction.com" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                ✉️
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-semibold mb-4 text-white border-b border-gray-600 pb-2 inline-block">
              Collections
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {collections.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Products */}
          <div>
            <h3 className="font-semibold mb-4 text-white border-b border-gray-600 pb-2 inline-block">
              Popular Products
            </h3>
            <div className="h-32 overflow-y-auto">
              <ul className="space-y-3 text-gray-300 text-sm pr-2">
                {popularCategories.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold mb-4 text-white border-b border-gray-600 pb-2 inline-block">
              Cities We Deliver To
            </h3>
            <div className="h-32 overflow-y-auto">
              <ul className="space-y-3 text-gray-300 text-sm pr-2">
                {deliveryCities.map((city, index) => (
                  <li key={index}>{city.name}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white border-b border-gray-600 pb-2 inline-block">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300 text-sm">

              {/* Bhubaneswar Office 1 */}
              <div>
                <span className="font-semibold text-white block mb-1">
                  Bhubaneswar Office (Jagamara)
                </span>
                <span>
                  Plot no-B/32, Sidhivihar, New Jagamara Road, Infront of Pabitra Mandap,
                  Bhubaneswar, Khurda, Odisha – 751030
                </span>
              </div>

              {/* Bhubaneswar Office 2 – NEW */}
              <div>
                <span className="font-semibold text-white block mb-1">
                  Bhubaneswar Office (Old Town)
                </span>
                <span>
                  Plot no-1967, Sriram Nagar, Old Town, Bhubaneswar, Odisha – 751002
                </span>
              </div>

              {/* Bengaluru Office */}
              <div>
                <span className="font-semibold text-white block mb-1">
                  Bengaluru Office
                </span>
                <span>
                  J304 Icon Happy Living, Electronic City Phase 2,
                  Bengaluru – 560100
                </span>
              </div>

              <div>📞 +91 95835 30095</div>
              <div>✉️ <a href="mailto:info@archikconstruction.com" className="hover:underline">info@archikconstruction.com</a></div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400 mb-2">We Accept Secure Payment</p>
          <div className="flex justify-center gap-3">
            <span className="px-3 py-1 bg-white text-gray-800 rounded text-xs font-bold">UPI</span>
            <span className="px-3 py-1 bg-gray-600 rounded text-xs font-bold">PhonePe</span>
            
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Archik Construction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
