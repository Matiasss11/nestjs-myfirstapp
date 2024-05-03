import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    

    /*
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
    */

    getUsers() {
        return this.userRepository.find(); // Find trae todos los users
    }

    createUser(user: CreateUserDto) {
        const newUser = this.userRepository.create(user);

        return this.userRepository.save(newUser);

    }

    getUser(id: number) {
        return this.userRepository.findOne({    // FindOne espera que le pasemos opciones para buscar un registro en base al dato que le pasamos
            where: {
                id
            }
        }); 
    }

    updateUser(id: number, user: UpdateUserDto) {
        return this.userRepository.update({id}, user);
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }
}
