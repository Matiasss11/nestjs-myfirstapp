import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UsersService
  ) {}

  async create(post: CreatePostDto) {

    const userFound = await this.userService.getUser(post.authorId)

    if (!userFound) return new HttpException('No user found', HttpStatus.NOT_FOUND)

    const newPost = this.postRepository.create(post)
    return this.postRepository.save(newPost);
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.find({ where: { authorId: userId } });
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
