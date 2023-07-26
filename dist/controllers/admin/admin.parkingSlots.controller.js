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
exports.deleteParkingSlots = exports.updateParkingSlot = exports.createParkingSlot = void 0;
const db_1 = require("../../db");
const createParkingSlot = (createSlotData) => __awaiter(void 0, void 0, void 0, function* () {
    const slotToInsert = {
        slot_number: createSlotData.slotNumber,
        slot_floor: createSlotData.slotFloor,
        slot_type: createSlotData.slotType,
        parking_area_id: createSlotData.parkingAreaId,
    };
    const insertedRows = yield new db_1.QueryBuilder()
        .insert({
        tableName: "parking_slots",
        data: slotToInsert,
    })
        .execute();
    return insertedRows[0];
});
exports.createParkingSlot = createParkingSlot;
const updateParkingSlot = (updateSlotData) => __awaiter(void 0, void 0, void 0, function* () {
    const slotToUpdate = {
        slot_number: updateSlotData.slotNumber,
        slot_floor: updateSlotData.slotFloor,
        slot_type: updateSlotData.slotType,
        parking_area_id: updateSlotData.parkingAreaId,
    };
    const rows = yield new db_1.QueryBuilder()
        .update({
        tableName: "parking_slots",
        data: slotToUpdate,
    })
        .where({ id: updateSlotData.id })
        .execute();
    return rows[0];
});
exports.updateParkingSlot = updateParkingSlot;
const deleteParkingSlots = (slotIds) => __awaiter(void 0, void 0, void 0, function* () {
    yield new db_1.QueryBuilder()
        .delete()
        .from("parking_slots")
        .whereIn("id", slotIds)
        .execute();
});
exports.deleteParkingSlots = deleteParkingSlots;
//# sourceMappingURL=admin.parkingSlots.controller.js.map