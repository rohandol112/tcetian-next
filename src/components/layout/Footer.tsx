import Link from 'next/link'
import { Github, Twitter, Linkedin, Instagram, Mail, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <div className="relative container max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              TCETian
            </h3>
            <p className="text-blue-100/80 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering TCET students to discover events, engage in meaningful discussions, 
              and build a vibrant campus community.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/events" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Events</span>
                </Link>
              </li>
              <li>
                <Link href="/forums" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Forums</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/student" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Profile</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Help Center</span>
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Guidelines</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-100/70 hover:text-white transition-colors text-sm group inline-flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-blue-100/70 text-sm mb-4">
              Get event notifications and campus updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg transition-all font-medium text-sm shadow-lg hover:shadow-xl">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-blue-100/60 text-sm flex items-center gap-2">
              © {currentYear} TCETian. Made with <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" /> for TCET students
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-blue-100/60 hover:text-white transition-colors text-sm">
                Terms
              </Link>
              <Link href="/privacy" className="text-blue-100/60 hover:text-white transition-colors text-sm">
                Privacy
              </Link>
              <Link href="/cookies" className="text-blue-100/60 hover:text-white transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
    </footer>
  )
}
