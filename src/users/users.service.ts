import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,   // private para instanciarlo
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) {}
    

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

    async createUser(user: CreateUserDto) {

        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return  new HttpException('Uers already exists', HttpStatus.CONFLICT);
        }

        const newUser = this.userRepository.create(user);

        return this.userRepository.save(newUser);

    }

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({    // FindOne espera que le pasemos opciones para buscar un registro en base al dato que le pasamos
            where: {
                id
            }
        });
        
        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return userFound;
    }

    async updateUser(id: number, user: UpdateUserDto) {

        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const updateUser = Object.assign(userFound, user);

        // return this.userRepository.update({id}, user);
        return this.userRepository.save(updateUser);
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete({ id });

        if (result.affected === 0) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return result;
    }

    async createProfile( id: number, profile: CreateProfileDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        
        const newProfile = this.profileRepository.create(profile)
        const savedProfile = await this.profileRepository.save(newProfile)
        userFound.profile = savedProfile

        userFound.profile = savedProfile

        return this.userRepository.save(userFound)
    }
}
