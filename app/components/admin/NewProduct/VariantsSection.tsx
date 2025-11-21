import { Button } from "@/components/ui/button";
import InputField from "../../InputField";
import { VariantsSectionProps } from "./ProductForm";

function VariantsSection({
  fields,
  register,
  errors,
  remove,
  append,
}: VariantsSectionProps) {
  return (
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
  );
}

export default VariantsSection;
