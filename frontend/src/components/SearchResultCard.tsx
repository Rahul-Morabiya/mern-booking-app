import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/models/my-hotels";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr,3fr] border border-slate-300 rounded-lg p-8 gap-8 hover:shadow-lg transition duration-300 ease-in-out">
      <div className="w-full h-[300px] xl:h-full xl:max-h-[300px] relative overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded-lg xl:rounded-t-lg transition duration-300 ease-in-out transform hover:scale-105"
          alt={hotel.name}
        />
      </div>
      <div className="grid grid-rows-[1fr,2fr,1fr] xl:pl-8">
        <div className="flex flex-col justify-between">
          <div className="flex items-center mb-2">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-2 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer hover:underline transition duration-300 ease-in-out"
          >
            {hotel.name}
          </Link>
        </div>

        <div className="line-clamp-4 mb-4 xl:mb-0 text-slate-600">
          {hotel.description}
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="flex flex-wrap gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-slate-300 px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition duration-300 ease-in-out transform hover:scale-105"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="text-sm">
                +{hotel.facilities.length - 3} more
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-bold text-green-600">₹{hotel.pricePerNight} per night</span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl max-w-fit hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
