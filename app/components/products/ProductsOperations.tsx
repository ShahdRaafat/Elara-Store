import SortBy from "../SortBy";

function ProductsOperations() {
  return (
    <div>
      <SortBy
        options={[
          { value: "created_at-desc", label: "Newest" },
          { value: "price-asc", label: "Lowest Price" },
          { value: "price-desc", label: "Highest Price" },
        ]}
      />
    </div>
  );
}

export default ProductsOperations;
