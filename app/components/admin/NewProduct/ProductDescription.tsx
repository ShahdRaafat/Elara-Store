import { fieldProps } from "./NewProductForm";

function ProductDescription({ register, errors }: fieldProps) {
  return (
    <div className="sm:col-span-2 flex flex-col">
      <label className="text-sm font-bold">Description</label>
      <textarea
        {...register}
        placeholder="Describe the product..."
        className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
      ></textarea>
      {errors.description && (
        <p className="text-sm text-red-500 mt-1">
          {errors.description.message}
        </p>
      )}
    </div>
  );
}

export default ProductDescription;
