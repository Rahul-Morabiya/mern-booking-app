import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import * as apiClient from "../api-client";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  if (!hotelData) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 rounded text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="gird grid-cols-1 gap-8">
        {hotelData.map((hotel,index) => (
          <div key={index}  className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <span className="mr-2">
                  <BsMap />
                </span>
                {hotel.city},{hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <span className="mr-2">
                  <BsBuilding />
                </span>
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <span className="mr-2">
                  <BiMoney />
                </span>
                &#8377;{hotel.pricePerNight} per Night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <span className="mr-2">
                  <BiHotel />
                </span>
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <span className="mr-2">
                  <BiStar />
                </span>
                {hotel.starRating} Star Rating
              </div>

            </div>
            <span className="flex justify-end ">
                <Link to={`/edit-hotel/${hotel._id}`} className="bg-blue-600 rounded text-white text-xl font-bold p-2 hover:bg-blue-500">View Details</Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
