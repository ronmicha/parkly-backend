export type ParkingSlot = {
  id: string;
  slot_number: number;
  slot_floor: number;
  slot_type: "single" | "blocked" | "blocking";
  parking_area_id: string;
  vehicle_id: string | null;
};
