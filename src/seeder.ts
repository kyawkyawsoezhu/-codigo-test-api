import { createConnection } from "typeorm";
import { User } from "./entity/User";
import * as faker from 'faker'
import * as bcrypt from "bcrypt";
import { Voucher } from "./entity/Voucher";


createConnection().then(async connection => {

    console.info("Seeding User Data...");
    // await Promise.all(range(5).map(async () => {
    //     const password = await bcrypt.hash('password', 10);
    //     await connection.manager.save(connection.manager.create(User, {
    //         name: faker.name.findName(),
    //         username: faker.unique(faker.internet.userName),
    //         password,
    //         phoneNumber: faker.unique(faker.phone.phoneNumber),
    //     }))
    // }))

    console.info("Seeding Vocher Data...");
    await Promise.all(range(5).map(async () => {
        const amount = faker.random.arrayElement([5, 10, 25, 100])
        await connection.manager.save(connection.manager.create(Voucher, {
            title: `${amount}$`,
            description: faker.lorem.word(5),
            expiredAt: faker.date.between('2022-01-01', '2023-01-01'),
            image: faker.image.dataUri(),
            amount: amount,
            quantity: faker.datatype.number({ min: 10, max: 100 }),
            isActive: faker.datatype.boolean(),
            // type: faker.random.arrayElement(["myself", "gift"]), 
            type: "gift",
            limitPerUser: faker.datatype.number({ min: 2, max: 10 }),
            // discountPayment: faker.random.arrayElement(["creditCards", "cash"]),
            discountPayment: "cash",
            discountValue: faker.datatype.number({ min: 5, max: 20 }),
        }))
    }))



    connection.close();
}).catch(error => console.log(error));

function range(n: Number) {
    return Array(n).fill(undefined)
}
