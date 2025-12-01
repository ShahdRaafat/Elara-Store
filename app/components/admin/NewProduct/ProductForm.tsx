"use client";
import { addNewProduct, editProduct } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../../InputField";
import ImageUpload from "./ImageUpload";
import ProductDescription from "./ProductDescription";
import VariantsSection from "./VariantsSection";

interface VariantInput {
  size: string;
  stock: number;
}
export interface ProductFormInputs {
  name: string;
  description: string;
  price: number;
  stock?: number;
  category: string;
  image: FileList;
  hasVariants: boolean;
  variants?: VariantInput[];
}

export interface VariantsSectionProps {
  fields: FieldArrayWithId<ProductFormInputs, "variants", "id">[];
  register: UseFormRegister<ProductFormInputs>;
  errors: FieldErrors<ProductFormInputs>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<ProductFormInputs, "variants">;
}
export interface fieldProps {
  register: ReturnType<UseFormRegister<ProductFormInputs>>;
  errors: FieldErrors<ProductFormInputs>;
  mode?: "add" | "edit";
}

export default function ProductForm({
  mode,
  productId,
  initialValues,
}: {
  mode: "add" | "edit";
  productId?: string;
  initialValues?: Partial<ProductFormInputs> & { image_url?: string };
}) {
  const categories = ["Clothing", "Bags", "Accessories", "Shoes"];

  const form = useForm<ProductFormInputs>({
    defaultValues: {
      hasVariants: false,
      variants: [],
      ...initialValues,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const hasVariants = watch("hasVariants");

  async function onSubmit(data: ProductFormInputs) {
    try {
      if (mode === "add") {
        await addNewProduct(data);
        toast.success("Product created successfully!");
      } else {
        await editProduct(productId!, data);
        toast.success("Product updated successfully!");
      }

      reset();
    } catch (error) {
      toast.error("Failed to create or update product");
    }
  }

  return (
    <div className="bg-white p-6 md:p-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          <ProductDescription
            register={register("description", {
              required: "Description is required",
            })}
            errors={errors}
          />

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

          <ImageUpload
            register={register("image", {
              required: mode === "add" ? "Image is required" : false,
            })}
            errors={errors}
            mode={mode}
            initialImage={initialValues?.image_url}
          />
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
          <VariantsSection
            fields={fields}
            register={register}
            errors={errors}
            append={append}
            remove={remove}
          />
        )}

        <Button
          type="submit"
          className="bg-brand-500 text-white px-6 py-3 rounded-lg"
        >
          {mode === "add" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
