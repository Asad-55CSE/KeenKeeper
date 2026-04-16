import facebookImg from '../assets/facebook.png';
import instagramImg from '../assets/instagram.png';
import twitterImg from '../assets/twitter.png';

const Footer = () => {
  return (
    <footer className="bg-[#2D4A3E] text-white pt-14 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
        {/* Large logo */}
        <h2 className="text-3xl font-bold text-white tracking-tight">
          KeenKeeper
        </h2>

        <p className="text-green-200/80 text-sm max-w-lg leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the
          relationships that matter most.
        </p>

        {/* Social links */}
        <div>
          <p className="text-white font-semibold text-sm mb-3">Social Links</p>
          <div className="flex items-center justify-center gap-3">
            {[instagramImg, facebookImg, twitterImg].map((src, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <img src={src} alt="social" className="w-5 h-5 object-contain" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-200/60">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
