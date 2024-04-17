import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import "./ManageHotelForm.css";

const ImagesSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <>
      <h2 className="text-2xl font-bold mb-3 text-white">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="input-field"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "At least one image should be added.";
              }
              if (totalLength > 6) {
                return "Total no. of images cannot be more than 6.";
              }
              return true;
            },
          })}
        />
        {errors.imageFiles && (
          <span className="error-message">{errors.imageFiles.message}</span>
        )}
      </div>
    </>
  );
};

export default ImagesSection;
