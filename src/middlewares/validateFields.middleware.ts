import {NextFunction, Request, Response} from 'express';
import {AnyZodObject, ZodError} from 'zod';

export const schemaValidation = (
    schema: AnyZodObject,
) => async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (error) {
    // console.log(error);
    if (error instanceof ZodError) {
      return res.status(400).json({
        ok: false,
        errors: error.issues,
      });
    }
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
};
