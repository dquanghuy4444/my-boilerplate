import { IsNotEmpty, Length } from "class-validator";

export interface IImage {
    name: string;
    path: string;
}

export class ImageParams {
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    path: string;
}
