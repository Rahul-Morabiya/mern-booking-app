import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./facilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import "./ManageHotelForm.css";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

type Props = {
  onSave:(hotelFormData:FormData)=>void
  isLoading:boolean
}

const ManageHotelForm = ({onSave,isLoading}:Props) => {
  const formMethods = useForm<HotelFormData>();
  const {handleSubmit}=formMethods;
const onSubmit = handleSubmit((formDataJson:HotelFormData)=>{
  const formData = new FormData();
  formData.append("name",formDataJson.name);
  formData.append("city",formDataJson.city);
  formData.append("country",formDataJson.country);
  formData.append("description",formDataJson.description);
  formData.append("type",formDataJson.type);
  formData.append("pricePerNight",formDataJson.pricePerNight.toString());
  formData.append("starRating",formDataJson.starRating.toString());
  formData.append("adultCount",formDataJson.adultCount.toString());
  formData.append("childCount",formDataJson.childCount.toString());

  formDataJson.facilities.forEach((facility,index)=>{
    formData.append(`facilities[${index}]`,facility);
  });
  Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
    formData.append(`imageFiles`,imageFile);
  });
  console.log(formDataJson);
  console.log(formData);
  onSave(formData);
});

  return (
    <FormProvider {...formMethods}>
      <form className="form-container flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <div className="flex flex-row justify-center">
          <button type="submit" className="button disabled:bg-gray-500" disabled={isLoading}>
            {isLoading?"Saving...":"Save"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
