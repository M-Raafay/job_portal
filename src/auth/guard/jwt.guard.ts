import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { threadId } from 'worker_threads';

export class JwtGuard extends AuthGuard('jwt') {

    handleRequest(err, user, info: Error) {
                
        if (err || !user || info) {
            throw err || new UnauthorizedException(info.message);
        }

        return user;
    }
}
