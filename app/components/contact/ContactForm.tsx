"use client";
import { sendEmail } from "@/app/_lib/resend-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const result = await sendEmail(formData);

      if (result.success) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error(
          `Failed to send message. ${result.error || "Please try again later."}`
        );
      }
    } catch (error) {
      toast.error(
        `An unexpected error occurred. ${
          error instanceof Error ? error.message : "Please try again later."
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" px-8 lg:px-12 py-12 lg:py-16 bg-brand-500 relative overflow-hidden sm:h-[calc(100vh-90px)]">
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
        <form onSubmit={handleSubmit} className="space-y-6 ">
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
            disabled={isSubmitting}
            className="bg-[#F4F2EE] text-brand-500 hover:bg-white disabled:opacity-50 z-50 relative"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
