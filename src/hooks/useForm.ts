import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    submit: (vdata: typeof data) => Promise<void>
  ) => {
    e.preventDefault();
    const vdata = validate();

    if (vdata) {
      setValidating(true);
      submit(vdata).finally(() => setValidating(false));
    }
  };

  const validate = (): typeof initialData | undefined => {
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
    }
  };

  return { data, handleChange, handleSubmit, validating };
}
