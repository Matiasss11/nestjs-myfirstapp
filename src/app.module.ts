import { Module } from '@nestjs/common';
import { TasksModule } from "./tasks/tasks.module";
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({ //conexion db usando typeorm
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), 
    TasksModule, 
    ProjectsModule, 
    AuthModule, 
    UsersModule, 
    PaymentsModule
  ],
  controllers: [HelloController],
})
export class AppModule {}
