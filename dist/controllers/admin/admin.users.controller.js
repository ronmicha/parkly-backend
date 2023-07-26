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
exports.deleteUsers = exports.updateUser = exports.createUser = exports.getCustomerUsers = void 0;
const utils_1 = require("../../utils");
const db_1 = require("../../db");
const consts_1 = require("./consts");
const getCustomerUsers = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new db_1.QueryBuilder()
        .select("id", "first_name", "last_name", "phone_number", "email", "role", db_1.QueryBuilder.raw("ARRAY_AGG(user_vehicles.vehicle_id) as vehicle_ids"))
        .from("users")
        .leftJoin("user_vehicles", "users.id", "user_vehicles.user_id")
        .where({ customer_id: customerId })
        .groupBy("users.id")
        .execute();
});
exports.getCustomerUsers = getCustomerUsers;
const insertUserToDB = (userData, trx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userToInsert = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone_number: userData.phoneNumber,
        email: userData.email,
        role: userData.role,
        password: yield (0, utils_1.encrypt)(consts_1.INITIAL_PASSWORD),
        customer_id: userData.customerId,
        active_vehicle_id: ((_a = userData.vehicleIds) === null || _a === void 0 ? void 0 : _a.length) === 1 ? userData.vehicleIds[0] : null,
    };
    const insertedRows = yield new db_1.QueryBuilder(trx)
        .insert({
        tableName: "users",
        data: userToInsert,
    })
        .execute();
    return insertedRows[0];
});
const insertUserVehiclesToDB = (userId, vehicleIds, trx) => __awaiter(void 0, void 0, void 0, function* () {
    const data = vehicleIds.map((id) => ({
        user_id: userId,
        vehicle_id: id,
    }));
    yield new db_1.QueryBuilder(trx)
        .insert({ tableName: "user_vehicles", data })
        .execute();
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.QueryBuilder.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        const insertedUser = yield insertUserToDB(userData, trx);
        if (userData.vehicleIds) {
            yield insertUserVehiclesToDB(insertedUser.id, userData.vehicleIds, trx);
        }
        return insertedUser;
    }));
});
exports.createUser = createUser;
const updateUserInDB = (userData, trx) => __awaiter(void 0, void 0, void 0, function* () {
    const userToUpdate = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone_number: userData.phoneNumber,
        email: userData.email,
        role: userData.role,
        customer_id: userData.customerId,
    };
    const updatedRows = yield new db_1.QueryBuilder(trx)
        .update({
        tableName: "users",
        data: userToUpdate,
    })
        .where({ id: userData.id })
        .execute();
    return updatedRows[0];
});
const updateUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.QueryBuilder.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield updateUserInDB(userData, trx);
        if (userData.vehicleIds) {
            yield new db_1.QueryBuilder(trx)
                .delete()
                .from("user_vehicles")
                .where({ user_id: userData.id })
                .execute();
            yield insertUserVehiclesToDB(userData.id, userData.vehicleIds, trx);
        }
        return updatedUser;
    }));
});
exports.updateUser = updateUser;
const deleteUsers = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.QueryBuilder.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        yield new db_1.QueryBuilder(trx)
            .delete()
            .from("user_vehicles")
            .whereIn("user_id", userIds)
            .execute();
        yield new db_1.QueryBuilder(trx)
            .delete()
            .from("users")
            .whereIn("id", userIds)
            .execute();
    }));
});
exports.deleteUsers = deleteUsers;
//# sourceMappingURL=admin.users.controller.js.map