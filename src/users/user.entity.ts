import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'users'}) //opcional poner el nombre, sino pondra en plural el nombre de la clase
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({nullable: true})
    authStrategy: string
}