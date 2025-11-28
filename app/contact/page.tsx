import { ContactForm } from "../components/contact/ContactForm";
import { ContactInfo } from "../components/contact/ContactInfo";

export default function page() {
  return (
    <div className="h-[calc(100vh-90px)] bg-white relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]  -my-6 sm:-my-8  lg:-my-12 ">
      <main className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Left side*/}
        <ContactInfo />

        {/* Right side */}
        <ContactForm />
      </main>
    </div>
  );
}
