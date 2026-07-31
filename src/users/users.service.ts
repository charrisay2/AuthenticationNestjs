import { Injectable, NotFoundException } from '@nestjs/common';


export interface User { 
    userId: number;
    userName: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {userId : 1 ,userName : 'mario' ,password: 'abcd1234'},
        {userId : 2 ,userName : 'lu' ,password: 'abcd1234'}
    ]
    async findOne(userName : string): Promise<User> {
        const result = this.users.find((user) => (user.userName === userName))
        if (!result) {
            throw new NotFoundException(" Not found Username");
        }
        return result;
    }
}
