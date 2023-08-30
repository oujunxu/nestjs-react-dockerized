import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { UserI, UserRole } from '../models/user.interface';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private authService:AuthService
    ){}

    add(user: UserI): Observable<UserI> {
        return this.mailExists(user.email).pipe(
            switchMap((exists:boolean) => {
                if(!exists){
                    return this.authService.hashPassword(user.password).pipe(
                        switchMap((passwordHash: string) => {
                            const newUser = new UserEntity();
                            newUser.name = user.name;
                            newUser.email = user.email;
                            newUser.password = passwordHash;
                            newUser.roles = UserRole.USER;

                            /**
                             * pipe
                             * =====
                             * pipe is used in two scenarios: transformation e.g from string to int
                             * and validation evaluate data if valid, pass the data else throw an exception.
                             */
                            return from(this.userRepository.save(newUser)).pipe(
                                map((user: UserI) => {
                                    const {password, ...result} = user; //spread operator returns the whole array of result
                                    return result;
                                }),
                                catchError(err => throwError(() => err))
                    )}))
                }else{
                    throw new HttpException('Email already in use', HttpStatus.CONFLICT);
                }
            })
        )
        
       
        //return from(this.userRepository.save(user));
    }

    update(id: number, user: UserI): Observable<any> {
        delete user.email; //email and password are the ones that should not be possible to change using only a route/request like this.
        delete user.password;
        delete user.roles;
        return from(this.userRepository.update(id, user));
    }

    adminUpdate(id: number, user: UserI): Observable<any> {
        delete user.password;
        delete user.email;
        return from(this.userRepository.update(id, user));
    }

    updateUserRole(id: number, user: UserI): Observable<any>{
        return from(this.userRepository.update(id, user));
    }

    findAll(): Observable<UserI[]> {
        return from(this.userRepository.find()).pipe(
            map((users) => {
                users.forEach(function (v) {delete v.password});
                return users;
            })
        );
        //return from(this.userRepository.find());
    }

    paginate(options: IPaginationOptions): Observable<Pagination<UserI>>{
        return from(paginate<UserI>(this.userRepository, options)).pipe(
            map((usersPageable: Pagination<UserI>) => {
                usersPageable.items.forEach((v) => {delete v.password});

                return usersPageable;
            })
        )
    }

    findOne(id: number): Observable<UserI>{
        return from(this.userRepository.findOneBy({id})).pipe(
            map((user:UserI) => {
                const {password, ...result} = user;
                return result;
            })
        )
        //return from(this.userRepository.findOneBy({id}));
    }

    deleteOne(id: number): Observable<any>{
        return from(this.userRepository.delete({id}));
    }

    login(user: UserI): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: UserI)=>{
                if(user){
                    return this.authService.generateJWT(user).pipe(map((jwt: string)=>jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<UserI> {
        return this.findByMail(email).pipe(
            switchMap((user: UserI)=>this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if(match) {
                        const {password, ...result} = user;
                        return result;
                    }else{
                        throw new HttpException('Wrong Credentials', HttpStatus.CONFLICT);;
                    }
                })
            ))
        )
    }

    findByMail(email: string): Observable<UserI> {
        return from(this.userRepository.findOneBy({email}));
    }

    mailExists(email: string): Observable<boolean> {
        email = email.toLowerCase();
        return from(this.userRepository.findOneBy({email})).pipe(
            map((user: UserI) => {
                if(user){
                    return true;
                }else{
                    return false;
                }
            })
        )
    }
}
