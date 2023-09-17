import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "@nestjs/class-validator"
import { Transform } from "class-transformer"

export class LogInDto {

    @IsString()
    @IsEmail({}, { message: 'Invalid Email' })
    @Transform(({ value }) => value.toLowerCase())
    email:string

    @IsNotEmpty()
    @IsString()
    @Matches(
    /^(?=[A-Za-z0-9@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]+$)(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]).{8,}$/,
    {
        message:
        'Password should contain at least 8 characters with 1 special character and 1 number',
    }
   )
    password:string

}
