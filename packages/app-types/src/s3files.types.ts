import z from "zod";
import { s3FileSchema } from "schemas";
import { FrontendFile } from "./common.types";

export type S3File = z.infer<typeof s3FileSchema>;

export type UploadImageParamsFrontend = {
    image?: FrontendFile | '';
}