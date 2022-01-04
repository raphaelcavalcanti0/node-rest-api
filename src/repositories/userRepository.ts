import { db } from "../db";
import { DatabaseError } from "../models/errors/dbErrorsModel";
import { User } from "../models/userModel";

class UserRepository {
    async findAllUsers(): Promise<User[]> {
        const query = `SELECT uuid, username FROM app_users;`;

        const { rows } = await db.query<User>(query);

        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        const query = `SELECT uuid, username FROM app_users WHERE uuid=$1;`;

        const values = [uuid];
        try {
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;

            return user;
        } catch (error) {
            throw new DatabaseError('Erro ao consultar o ID', error);
        }

    }

    async create(user: User): Promise<string> {
        const insert = `
            INSERT INTO app_users (username, password) 
            VALUES ($1, crypt($2, 'chave')) 
            RETURNING uuid;
        `;

        const values = [user.username, user.password];
        const { rows } = await db.query<{ uuid: string }>(insert, values);
        const [newUser] = rows;

        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const insert = `
            UPDATE app_users SET 
            username=$1, 
            password=crypt($2, 'chave')
            WHERE uuid=$3;
        `;

        const values = [user.username, user.password, user.uuid];
        await db.query(insert, values);
    }

    async delete(uuid: string): Promise<void> {
        const query = `DELETE FROM app_users WHERE uuid=$1;`;

        const values = [uuid];
        await db.query(query, values);
    }

    async findByUsernameAndPassword(username: string, password: string): Promise<User> {
        const query = `
            SELECT uuid, username 
            FROM app_users 
            WHERE username=$1 and password=crypt($2, 'chave');
        `;

        const values = [username, password];
        try {
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;

            return user;
        } catch (error) {
            throw new DatabaseError('Usuário ou senha incorretos', error);
        }
    }
}

export default new UserRepository();