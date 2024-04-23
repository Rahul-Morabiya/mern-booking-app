import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
import "./ManageHotelForm.css";

const FacilitiesSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div className="facilities-section">
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="facility-label flex items-center">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  return facilities && facilities.length > 0;
                },
              })}
              className="mr-2"
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;