"use client";

import { useForm, useFieldArray } from "react-hook-form";
import InputField from "../../InputField";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";

interface VariantInput {
  size: string;
  stock: number;
}
interface ProductFormInputs {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: FileList;
  hasVariants: boolean;
  variants: VariantInput[];
}

export default function NewProductForm() {
  const categories = ["Clothing", "Bags", "Accessories", "Shoes"];
  const form = useForm<ProductFormInputs>({
    defaultValues: {
      hasVariants: false,
      variants: [],
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const hasVariants = watch("hasVariants");

  function onSubmit(data: ProductFormInputs) {
    console.log("Submit data:", data);
  }

  return (
    <div className="p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Product Name"
            placeholder="Enter Product Name"
            register={register("name", {
              required: "Product name is required",
            })}
            error={errors.name}
          />
          <InputField
            label="Price"
            placeholder="0.00"
            register={register("price", { required: "Price is required" })}
            error={errors.price}
          />

          <div className="sm:col-span-2 flex flex-col">
            <label className="text-sm font-bold">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Describe the product..."
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-bold">Category</label>
            <select
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-brand-500"
              {...register("category", { required: "Category is required" })}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold">Product Image</label>
            <Upload className="mt-2 text-gray-500" />
            <input
              type="file"
              accept="image/*"
              className="w-full mt-2"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-sm text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            checked={hasVariants}
            onCheckedChange={(state) => form.setValue("hasVariants", state)}
          />
          <p className="font-medium">This product has variants (sizes)</p>
        </div>

        {!hasVariants && (
          <div className="w-[50%]">
            <InputField
              label="Stock"
              placeholder="Enter total stock"
              register={register("stock", { required: "Stock is required" })}
              error={errors.stock}
            />
          </div>
        )}

        {hasVariants && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Variants</h3>
              <Button
                type="button"
                onClick={() => append({ size: "", stock: 0 })}
                className="bg-brand-500 text-white"
              >
                + Add Variant
              </Button>
            </div>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1  sm:grid-cols-[1fr_1fr_auto] gap-4 items-center justify-center border p-4 rounded-lg"
              >
                <InputField
                  label="Size"
                  placeholder="S / M / L / 36 / 38 ..."
                  register={register(`variants.${index}.size` as const, {
                    required: "Size is required",
                  })}
                  error={errors.variants?.[index]?.size}
                />

                <InputField
                  label="Stock"
                  placeholder="Stock"
                  register={register(`variants.${index}.stock` as const, {
                    required: "Stock is required",
                  })}
                  error={errors.variants?.[index]?.stock}
                />

                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="w-auto -mb-3"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          type="submit"
          className="bg-brand-500 text-white px-6 py-3 rounded-lg"
        >
          Create Product
        </Button>
      </form>
    </div>
  );
}
