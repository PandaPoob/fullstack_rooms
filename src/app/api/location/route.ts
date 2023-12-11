import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams.get("searchQuery");
    if (!searchParams) {
      return NextResponse.json({
        msg: "Required params not valid",
        status: 400,
      });
    }
    const file = await fs.readFile(
      process.cwd() + "/src/app/assets/data/city.list.json",
      "utf8"
    );

    const cities = JSON.parse(file);

    // Function to find the best matches based on the search query
    const findBestMatches = (searchQuery: string) => {
      // Filter cities based on search query logic
      const matchedCities = cities.filter((city: any) => {
        // Adjust the search logic as per your requirements
        return city.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

      return matchedCities.slice(0, 4);
    };

    // Example usage:
    const bestMatches = findBestMatches(searchParams);

    return NextResponse.json(
      {
        msg: "Ok",
        citiesResult: bestMatches,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
