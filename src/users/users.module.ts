import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthMiddleware } from './auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // En este caso importamos solo user entity
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('users') //para todas las rutas
    consumer.apply(LoggerMiddleware).forRoutes(
      {path: '/users', method: RequestMethod.GET}, //solo estaria para las rutas GET
      {path: '/users', method: RequestMethod.POST} //solo estaria para las rutas POST
    ).apply(AuthMiddleware).forRoutes('users');
  }
}
