import { QueryBuilder } from "../../db";
import { DB_Customer, DB_ParkingArea } from "../../models";

export const getCustomerParkingAreas = async (
  customerId: DB_Customer["id"]
): Promise<DB_ParkingArea[]> => {
  return new QueryBuilder()
    .select("id", "name", "street_address", "city")
    .from("parking_areas")
    .innerJoin(
      "customer_parking_areas",
      "parking_areas.id",
      "customer_parking_areas.parking_area_id"
    )
    .where({ customer_id: customerId })
    .execute();
};
