import mongoose, { ClientSession } from "mongoose";

export async function withTransaction<T>(connection: mongoose.Connection, closure: (session: ClientSession) => any): Promise<T> {
    const session = await connection.startSession();

    let result: any;

    await session.withTransaction(async () => {
        result = await closure(session);

        return result;
    });

    await session.endSession();

    return result as T;
}
