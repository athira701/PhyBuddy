import { Request,Response,NextFunction } from "express";
import { ZodSchema } from "zod";


export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {

    console.log("Request Body:", req.body);
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      console.log(result.error.issues);
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });

      return;
    }

    req.body = result.data;

    next();
  };