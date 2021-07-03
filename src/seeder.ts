import { createConnection } from "typeorm";
import { User } from "./entity/User";
import * as faker from 'faker'

createConnection().then(async connection => {

    console.info("Seeding User Data...");
    await Promise.all(range(5).map(async () => {
        await connection.manager.save(connection.manager.create(User, {
            name: faker.name.findName(),
            username: faker.unique(faker.internet.userName),
            password: 'password',
            phoneNumber: faker.unique(faker.phone.phoneNumber),
        }))
    }))

    connection.close();
}).catch(error => console.log(error));

function range(n: Number) {
    return Array(n).fill(undefined)
}
