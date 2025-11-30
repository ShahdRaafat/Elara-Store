export function ContactInfo() {
  return (
    <div className="flex flex-col px-8  lg:px-16 py-12 lg:py-16 bg-[#F4F2EE] sm:h-[calc(100vh-90px)]">
      <div>
        <div className="mb-10">
          <div className="mb-4">
            <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">
              Get In Touch
            </p>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-black leading-none mb-8">
            Let us <br />
            <span className="font-bold">Connect</span>
          </h1>
          <div className="w-16 h-1 bg-brand-500 mt-6" />
        </div>

        <div className="max-w-sm mb-8 space-y-4">
          <p className="text-base text-gray-800 leading-relaxed font-light">
            Have a question about our collections, need personalized styling, or
            want to collaborate? Wed love to hear from you.
          </p>
          <p className="text-sm text-gray-600 font-light">
            Were committed to responding thoughtfully to every message within 24
            hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 ">
              Email
            </p>
            <p className="font-bold">ElaraStore@gmail.com</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Phone
            </p>
            <p className="font-bold">01122334455</p>
          </div>
        </div>
      </div>
    </div>
  );
}
