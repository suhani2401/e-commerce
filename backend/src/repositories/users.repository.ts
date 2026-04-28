import { Roles } from "../models/roles.model";
import { RequiredUserAttributesType, UserAttributesType } from "../models/types/users.types";
import { User } from "../models/users.model";
import { generateJwtToken } from "../utils";
import { BaseRepository } from "./base.repository";
import bcrypt from "bcrypt";

export class UserRepository extends BaseRepository<User, UserAttributesType, RequiredUserAttributesType> {
    constructor() {
        super(User);
    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            return await this.findOne({ where: { email } });
        } catch (error) {
            throw new Error(`Failed to find user by email: ${error}`);
        }
    }

    async registerUser(userData: UserAttributesType): Promise<User> {
        try {
            const { role, ...data } = userData;
            console.log(role)
            const roleDetails = await Roles.findOne({ where: { role }, attributes: ['id'] });
            console.log(roleDetails)
            return await this.create({ ...data, role: roleDetails.id });
        } catch (error) {
            throw new Error(`Failed to register User: ${error}`);
        }
    }

    async loginUser(data: { email: string, password: string }): Promise<{ user: User, token: string }> {
        try {
            const isUserExist = await this.findUserByEmail(data.email);
            if (!isUserExist) throw new Error("User Doesn't Exist");

            const authenticateUser = await bcrypt.compare(data.password, isUserExist.password);
            if (!authenticateUser) throw new Error("Invalid Credentials");

            const token = generateJwtToken(isUserExist);

            return { user: isUserExist, token };
        } catch (error) {
            throw new Error(`Failed to login User: ${error}`);
        }
    }
}
