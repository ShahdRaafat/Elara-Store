import NewProductForm from "../components/admin/NewProduct/NewProductForm";

function page() {
  return (
    <div>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 ">
        New Product Page
      </h1>
      <p className="mb-6 text-gray-500">Here you can add a new product.</p>
      <NewProductForm />
    </div>
  );
}

export default page;
