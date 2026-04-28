// src/repositories/base.repository.ts
import {
    Model,
    ModelStatic,
    FindOptions,
    CreateOptions,
    UpdateOptions,
    DestroyOptions,
} from "sequelize";

export class BaseRepository<
    T extends Model<TAttributes, TCreationAttributes>,
    TAttributes,
    TCreationAttributes
> {
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    // CREATE
    async create(
        data: TCreationAttributes,
        options?: CreateOptions<TAttributes>
    ): Promise<T> {
        return this.model.create(data as any, options);
    }

    // BULK CREATE
    async bulkCreate(
        data: TCreationAttributes[],
        options?: CreateOptions<TAttributes>
    ): Promise<T[]> {
        return this.model.bulkCreate(data as any[], options);
    }

    // FIND ALL
    async findAll(options?: FindOptions<TAttributes>): Promise<T[]> {
        return this.model.findAll(options);
    }

    // FIND ONE
    async findOne(options: FindOptions<TAttributes>): Promise<T | null> {
        return this.model.findOne(options);
    }

    // FIND BY ID
    async findById(id: string | number): Promise<T | null> {
        return this.model.findByPk(id);
    }

    // UPDATE
    async update(
        values: Partial<TAttributes>,
        options: UpdateOptions<TAttributes>
    ): Promise<[number]> {
        return this.model.update(values, options);
    }

    // DELETE
    async delete(options: DestroyOptions<TAttributes>): Promise<number> {
        return this.model.destroy(options);
    }

    // COUNT
    async count(options?: FindOptions<TAttributes>): Promise<number> {
        return this.model.count(options);
    }
}