import { fieldProps } from "./NewProductForm";

function ImageUpload({ register, errors }: fieldProps) {
  return (
    <div>
      <label className="text-sm font-bold">Product Image</label>

      <input
        placeholder="Upload Image"
        type="file"
        accept="image/*"
        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        {...register}
      />
      {errors.image && (
        <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
      )}
    </div>
  );
}

export default ImageUpload;
