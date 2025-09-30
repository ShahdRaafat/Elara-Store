import SignUpForm from "../components/AuthForms/SignupForm";

function page() {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      <SignUpForm />
    </div>
  );
}
export default page;
