import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "@nestjs/class-validator"
import { Role } from "@prisma/client"
import { Transform } from "class-transformer"
import {IsNumber, IsPhoneNumber, Min } from "class-validator"

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    firstName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    middleName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    lastName:string

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

    @IsNotEmpty()
    @IsNumber()
    @Min(11)
    //@IsPhoneNumber(region: string) //Checks if the string is a valid phone number using libphonenumber-js.
    mobilePhone:number

    @IsNotEmpty()
    @IsNumber()
    @Min(11)
    whatsapp:number

    @IsNotEmpty()
    @IsString()
    @IsIn(["User", "Admin", "Super_Admin"], { message: 'role field must be either "User", "Admin" or "Super_Admin"' })
    role:Role

}
