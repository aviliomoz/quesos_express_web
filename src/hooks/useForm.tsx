import { ChangeEvent, useEffect, useState } from "react";
import { ZodError, ZodIssue, ZodSchema } from "zod";
import { toast } from "react-hot-toast";

export function useForm<TData>(initialData: TData, schema: ZodSchema) {
  const [data, setData] = useState<TData>(initialData);
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  useEffect(() => {
    errors.length > 0 && toast.error(errors[0].message);
  }, [errors]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateForm = (): TData | undefined => {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error.errors);
      }
    }
  };

  return { data, setData, handleChange, validateForm };
}
