import { FilterSelect } from "./ui/FilterSelect";
import { FilterWidget } from "./ui/FilterWidget";

export const MovementFilters = () => {
  return (
    <FilterWidget>
      <FilterSelect
        label="Estado"
        name="status"
        options={[
          {
            value: "all",
            text: "Todos",
          },
          {
            value: "active",
            text: "Activos",
          },
          {
            value: "inactive",
            text: "Inactivos",
          },
        ]}
      />
    </FilterWidget>
  );
};
