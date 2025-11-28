import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  return (
    <div className=" px-8 lg:px-12 py-12 lg:py-16 bg-brand-500 relative overflow-hidden h-[calc(100vh-90px)]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/3 rounded-full -ml-36 -mb-36" />

      <div>
        <div className="mb-10">
          <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-4">
            Message
          </p>
          <h2 className="text-4xl sm:text-5xl font-light text-white leading-tight">
            We&apos;re <span className="font-bold">listening.</span>
          </h2>
        </div>
        <form className="space-y-6 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-white/70 uppercase tracking-wide mb-3"
              >
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Enter your Name"
                className="w-full md:w-full"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-white/70 uppercase tracking-wide mb-3"
              >
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your Email Address"
                className="w-full md:w-full text-sm placeholder:text-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-white/70 uppercase tracking-wide mb-3"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your Phone Number"
                className="w-full md:w-full text-sm placeholder:text-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-medium text-white/70 uppercase tracking-wide mb-3"
              >
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                required
                placeholder="Subject"
                className="w-full md:w-full text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-white/70 uppercase tracking-wide mb-3 "
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Tell us what's on your mind..."
              rows={4}
              className="w-full rounded-md border  bg-white/90 px-4 py-2 text-sm placeholder:text-gray-400  "
            />
          </div>

          <Button
            type="submit"
            className="bg-[#F4F2EE] text-brand-500 hover:bg-white"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
