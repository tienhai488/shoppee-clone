import useQueryConfig from "./useQueryConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, type Schema } from "src/utils/rules";
import { useNavigate } from "react-router-dom";
import path from "src/constants/path";

type FormData = Pick<Schema, "name">;

const nameSchema = schema.pick(["name"]);

export default function useSearchProducts() {
  const queryConfig = useQueryConfig();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: queryConfig.name || ""
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate();

  const onSubmitSearch = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: new URLSearchParams({
        ...queryConfig,
        name: data.name,
      }).toString()
    })
  });

  return { register, onSubmitSearch }
}