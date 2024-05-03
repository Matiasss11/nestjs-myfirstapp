import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    private users: any = [
        {
            id: 1,
            name: 'John Doe',
            phone: '12344678'
        },
        {
            id: 2,
            name: 'Jane Doe',
            phone: '87654321'
        }
    ]
    getUsers() {
        return this.users;
    }

    createUser(user: CreateUserDto) {
        this.users.push(user);

        return {
            ...user,
            id: this.users.length + 1
        };
    }
}
