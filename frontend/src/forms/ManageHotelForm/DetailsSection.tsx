import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import "./ManageHotelForm.css";

const DetailsSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3 text-white">Add Hotel</h1>
      <label className="input-label">
        Name
        <input
          type="text"
          className="input-field"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="input-label">
          City
          <input
            type="text"
            className="input-field"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="error-message">{errors.city.message}</span>
          )}
        </label>
        <label className="input-label">
          Country
          <input
            type="text"
            className="input-field"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="error-message">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="input-label text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="input-field border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="input-label text-gray-700 text-sm font-bold max-w-[50%]">
          Price Per Night
          <input
            type="number"
            min={1}
            className="input-field border rounded w-full py-1 px-2 font-normal"
            {...register("pricePerNight", { required: "This field is required" })}
          />
          {errors.pricePerNight && (
            <span className="error-message">{errors.pricePerNight.message}</span>
          )}
        </label>

        <label className="input-label text-gray-700 text-sm font-bold max-w-[50%]">
          Star Rating
          <select
            {...register("starRating", {
              required: "This field is required."
            })}
            className="input-field border rounded w-full py-1 px-2 font-normal"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          {errors.starRating && (
            <span className="error-message">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
}

export default DetailsSection;
