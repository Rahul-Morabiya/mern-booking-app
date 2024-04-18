import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import "./ManageHotelForm.css";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-3 ">Guests</h2>
      <div className=" flex flex-row p-4 rounded w-full gap-5 ">
        <div className="flex flex-col">
          <label className="text-white text-sm ">
            Adults
            <input
              className="input-field"
              type="number"
              id="adultQuantity"
              min={1}
              max={10}
              {...register("adultCount", {
                required: "This Field is required.",
              })}
            />
          </label>
          {errors.adultCount?.message && (
            <span className="error-message">{errors.adultCount?.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white text-sm">
            Children
            <input
              className="input-field"
              type="number"
              id="childrenQuantity"
              min={0}
              max={10}
              {...register("childCount", {
                validate: (count) => {
                  if (count >= 0) {
                    return true;
                  } else {
                    return false;
                  }
                },
              })}
            />
          </label>
          {errors.childCount?.message && (
            <span className="error-message">{errors.childCount?.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestSection;
