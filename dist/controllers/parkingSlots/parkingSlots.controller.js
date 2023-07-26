"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSlotStatus = exports.getParkingSlots = void 0;
const db_1 = require("../../db");
const tableName = "parking_slots";
const getParkingSlots = (parkingAreaId) => __awaiter(void 0, void 0, void 0, function* () {
    return new db_1.QueryBuilder()
        .select("id", "parking_area_id", "slot_number", "slot_floor", "slot_type", "vehicle_id")
        .from(tableName)
        .where({ parking_area_id: parkingAreaId })
        .execute();
});
exports.getParkingSlots = getParkingSlots;
const updateSlotStatus = (slotId, vehicleId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.QueryBuilder.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        const rows = yield new db_1.QueryBuilder(trx)
            .select("*")
            .from(tableName)
            .where({ id: slotId })
            .execute();
        const slot = rows[0];
        const existingVehicleId = slot.vehicle_id;
        if (vehicleId && existingVehicleId) {
            throw new Error(`Slot status could not be changed. This slot is already taken by vehicle '${existingVehicleId}'`);
        }
        yield new db_1.QueryBuilder(trx)
            .update({ tableName, data: { vehicle_id: vehicleId } })
            .where({ id: slotId })
            .execute();
    }));
});
exports.updateSlotStatus = updateSlotStatus;
//# sourceMappingURL=parkingSlots.controller.js.map