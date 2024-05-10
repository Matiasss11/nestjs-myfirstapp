import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  create(@Body() post: CreatePostDto) {
    console.log(post);   
    
    return this.postService.create(post);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get('user/:userId')
  /**
   * El signo más (+) que precede al parámetro userId en la función getPostsByUserId del controlador es una 
   * convención de TypeScript y JavaScript que se utiliza para convertir una cadena en un número.
   */
  async getPostsByUserId(@Param('userId') userId: string) {
    const posts = await this.postService.getPostsByUserId(+userId); 
    return posts;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
