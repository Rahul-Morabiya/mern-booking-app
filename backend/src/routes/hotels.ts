import express, { Request, Response } from "express";
import Hotel, { HotelSearchResponse } from "../models/my-hotels";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const { constructedQuery, queryParams } = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(constructedQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(constructedQuery);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
});


const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount && !isNaN(parseInt(queryParams.adultCount))) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount && !isNaN(parseInt(queryParams.childCount))) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRating = Array.isArray(queryParams.stars)
      ? { $in: queryParams.stars.map((star: string) => parseInt(star)) }
      : parseInt(queryParams.stars);
    constructedQuery.starRating = starRating;
  }

  if (queryParams.maxPrice) {
    const maxPrice = parseInt(queryParams.maxPrice);
    if (!isNaN(maxPrice)) {
      constructedQuery.pricePerNight = {
        $lte: maxPrice,
      };
    }
  }

  return { constructedQuery, queryParams };
};


export default router;
