import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
import "./ManageHotelForm.css";

const TypeSection = () => {
  const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div className="type-section">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label key={type}
            className={
              `type-label ${typeWatch === type ? 'selected' : ''}`
            }
          >
            <input key={type}
              type="radio"
              value={type}
              {...register("type", { required: "This field is required." })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="error-message">{errors.type.message}</span>
      )}
    </div>
  );
}

export default TypeSection;
