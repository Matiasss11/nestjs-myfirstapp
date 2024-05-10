import { User } from "src/users/user.entity";

export class CreatePostDto {
    title: string | undefined
    content: string
    authorId: number
}
