import { ChangeEvent, useEffect, useState } from "react";
import { ZodError, ZodSchema } from "zod";
import { toast } from "react-hot-toast";

export function useForm<TData extends Record<string, string>>(
  initialData: TData,
  schema: ZodSchema
) {
  const [data, setData] = useState<typeof initialData>(initialData);
  const [errors, setErrors] = useState<string[]>([]);
  const [validating, setValidating] = useState<boolean>(false);

  useEffect(() => {
    errors.length > 0 && toast.error(errors[0]);
  }, [errors]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = (): typeof initialData | undefined => {
    setValidating(true);

    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(
          error.errors.map((error) => {
            return error.message;
          })
        );
      }
    } finally {
      setValidating(false);
    }
  };

  return { data, handleChange, validate, validating };
}
